/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-18 19:07:45
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-31 00:27:32
*/
import { setUniforms } from '../utils/gl-utils.js';
import { vertexShader, fragmentShader, wrapBuffer} from '../shaders/line-shader.js';
import { pointVertexShader, pointFragmentShader, pointWrapBuffer } from '../shaders/point-shader.js'
import { getGL, compileShader } from '../utils/gl-help.js';
import { rectFragmentShader, rectVertexShader, wrapRectBuffer } from '../shaders/rect-shader.js';
import { circleFragmentShader, circleVertexShader, wrapCircleBuffer } from '../shaders/circle-shader.js';
import { Transform } from '../utils/gl-transform.js';

const ResourceTypes = {
    AttributeBuffer: 'AttributeBuffer',
    Uniforms: 'Uniforms',
    VEC1: '1',
    VEC2: '2',
    VEC3: '3',
    VEC4: '4', 
}

// gl.POINTS: 绘制一系列点。
// gl.LINE_STRIP: 绘制一个线条。即，绘制一系列线段，上一点连接下一点。  0,1->1,2->2,3....
// gl.LINE_LOOP: 绘制一个线圈。即，绘制一系列线段，上一点连接下一点，并且最后一点与第一个点相连。
// gl.LINES: 绘制一系列单独线段。每两个点作为端点，线段之间不连接。0,1->2,3->3,4....
// gl.TRIANGLE_STRIP：绘制一个三角带。
// gl.TRIANGLE_FAN：绘制一个三角扇。
// gl.TRIANGLES: 绘制一系列三角形。每三个点作为顶点。

const DrawTypes = {
    POINTS: 'POINTS',
    LINE_STRIP: 'LINE_STRIP',
    LINE_LOOP: 'LINE_LOOP',
    LINES: 'LINES',
    TRIANGLE_STRIP: 'TRIANGLE_STRIP',
    TRIANGLE_FAN: 'TRIANGLE_FAN',
    TRIANGLES: 'TRIANGLES',
};

class GL {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = getGL(this.canvas, {
            preserveDrawingBuffer: true,
        });
        this._translateMatrix = [0.0, 0.0, 0.0];
        this._roratedMatrix = 0;
        this._scaleMatrix = [1.0, 1.0, 1.0];
        this._drawMap = new Map();
        this._initDrawTypes();
    }

    clear() {
        this.gl.clear();
    }

    draw(source) {
        const { vs, fs, buffer, type } = source;
        console.log(' draw: source:', source);
        const program = compileShader(this.gl, vs, fs);
        // 编译着色器
        if (!program) {
            console.error('compiled gl error');
            return;
        }
        this.gl.program = program;
        this._settingBuffer(buffer);
        const item = this._drawMap.get(type);
        if (item) {
            item(buffer[0].count);
        } else {
            console.error('type is not define');
        }
    }

    translate(resource) {
        const { x, y, z } = resource;
        this._translateMatrix = [x, y, z];
        return this;
    }

    rotated(resource) {
        const { du } = resource;  
        this._roratedMatrix = du;
        return this;
    }

    scale(resource) {
        const { x, y, z } = resource;
        this._scaleMatrix = [x, y, z];
        return this;
    }

    drawPoint(points, colors, size) {
        const buffer = pointWrapBuffer(points, colors, size);
        this.draw({
            vs: pointVertexShader,
            fs: pointFragmentShader,
            buffer,
            type: DrawTypes.POINTS
        });
    }

    drawCircle(resource) {
        const buffer = wrapCircleBuffer(resource);
        this.draw({
            vs: circleVertexShader,
            fs: circleFragmentShader,
            buffer,
            type: DrawTypes.LINE_LOOP,
        });
    }

    drawLine(points, colors) {
        const buffer = wrapBuffer(points, colors);
        this.draw({
            vs: vertexShader,
            fs: fragmentShader,
            buffer,
            type: DrawTypes.LINE_STRIP,
        });
    }

    drawRect(resource) {
        const buffer = wrapRectBuffer(resource);
        this.draw({
            vs: rectVertexShader,
            fs: rectFragmentShader,
            buffer,
            type: DrawTypes.TRIANGLE_STRIP
        });
    }

    clearRect(resource) {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/scissor
        const { x, y, width, height } = resource;
        // turn on scissor test
        this.gl.enable(this.gl.SCISSOR_TEST);

        // set the scissor rectangle
        this.gl.scissor(x, y, width, height);

        // execute drawing commands in the scissor box (e.g. clear)
        this.gl.clearColor(1.0, 0, 0, 0); 
        this.gl.clear(this.gl.COLOR_BUFFER_BIT); 
        // turn off scissor test again
        this.gl.disable(this.gl.SCISSOR_TEST);
    }

    _initDrawTypes() {
        this._drawMap.set(DrawTypes.POINTS, (count) => {
            this.gl.drawArrays(this.gl.POINTS, 0, count);
        });
        this._drawMap.set(DrawTypes.LINES, (count) => {
            this.gl.drawArrays(this.gl.LINES, 0, count);
        });
        this._drawMap.set(DrawTypes.LINE_STRIP, (count) => {
            this.gl.drawArrays(this.gl.LINE_STRIP, 0, count);
        });
        this._drawMap.set(DrawTypes.LINE_LOOP, (count) => {
            this.gl.drawArrays(this.gl.LINE_LOOP, 0, count);
        });
        this._drawMap.set(DrawTypes.TRIANGLE_STRIP, (count) => {
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, count);
        });
        this._drawMap.set(DrawTypes.TRIANGLE_FAN, (count) => {
            this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, count);
        });
        this._drawMap.set(DrawTypes.TRIANGLES, (count) => {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, count);
        });
    }

    _settingBuffer(data) {
        data.forEach((value, index) => {
            const type = value.type;
            const len = value.len;
            Object.keys(value).forEach((key) => {
                const item = value[key];
                if (key != 'type' && key != 'len' && key != 'count') {
                    const bytes = Array.isArray(item) ? new Float32Array(item) : new Float32Array([item]);
                    const fsize = bytes.BYTES_PER_ELEMENT;

                    if (type == ResourceTypes.AttributeBuffer) {
                        Transform.translate(bytes, this._translateMatrix);
                        Transform.rotated(bytes, this._roratedMatrix);
                        Transform.scale(bytes, this._scaleMatrix);
                        const attribute = this.gl.getAttribLocation(this.gl.program, key);
                        if (attribute == -1) {
                            console.error(` ${key} is not fined in shader`);
                            return;
                        }
                        const buffer = this.gl.createBuffer();
                        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
                        this.gl.bufferData(this.gl.ARRAY_BUFFER, bytes, this.gl.STATIC_DRAW);
                        this.gl.vertexAttribPointer(attribute, len, this.gl.FLOAT, false, 0, 0);
                        this.gl.enableVertexAttribArray(attribute);
                    } else if (type == ResourceTypes.Uniforms) {
                        const uniform = this.gl.getUniformLocation(this.gl.program, key);
                        if (!uniform) {
                            console.error(` ${key} is not fined in shader`);
                            return;
                        }
                        setUniforms(this.gl, uniform, bytes, len);
                    }
                }
            });
        });
    }
}

export { GL, ResourceTypes }