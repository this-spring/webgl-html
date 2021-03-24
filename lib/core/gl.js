/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-18 19:07:45
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-24 13:35:10
*/
import { vertexShader, fragmentShader, wrapBuffer} from '../shaders/line-shader.js'; 
import { getGL, compileShader } from '../utils/gl-help.js';

const ResourceTypes = {
    AttributeBuffer: 'AttributeBuffer',
    Uniforms: 'Uniforms',
    VEC2: 'VEC2',
    VEC3: 'VEC3',
    VEC4: 'VEC4', 
}

// gl.POINTS: 绘制一系列点。
// gl.LINE_STRIP: 绘制一个线条。即，绘制一系列线段，上一点连接下一点。
// gl.LINE_LOOP: 绘制一个线圈。即，绘制一系列线段，上一点连接下一点，并且最后一点与第一个点相连。
// gl.LINES: 绘制一系列单独线段。每两个点作为端点，线段之间不连接。
// gl.TRIANGLE_STRIP：绘制一个三角带。
// gl.TRIANGLE_FAN：绘制一个三角扇。
// gl.TRIANGLES: 绘制一系列三角形。每三个点作为顶点。

const DrawTypes = {
    POINTS: 'POINTS',
    LINE_STRIP: 'LINE_STRIP',
    LINE_LOOP: 'LINE_LOOP',
    LINES: 'LINES', 
};

class GL {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = getGL(this.canvas, {
            preserveDrawingBuffer: true,
        });
    }

    clear() {

    }

    draw(source) {
        console.error(source);
        const { vs, fs, buffer, type } = source;
        const program = compileShader(this.gl, vs, fs);
        // 编译着色器
        if (!program) {
            console.error('compiled gl error');
            return;
        }
        this.gl.program = program;
        // const blen = buffer.length;
        this._settingBuffer(buffer);
        // const drawType = buffer[blen - 1];
        // this.gl.drawArrays(this.gl.LINES, 0, 2);
        if (type == DrawTypes.LINES) {
            console.log(buffer);
            this.gl.drawArrays(this.gl.LINES, 0, buffer[0].pointCount);
        } else if (type == DrawTypes.LINE_STRIP) {
            this.gl.drawArrays(this.gl.LINE_STRIP, 0, buffer[0].pointCount); 
        }
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

    _settingBuffer(data) {
        data.forEach((value, index) => {
            const type = value.type;
            const len = value.len;
            Object.keys(value).forEach((key) => {
                const item = value[key];
                if (key != 'type' && key != 'len') {
                    const bytes = new Float32Array(item);
                    const fsize = bytes.BYTES_PER_ELEMENT;

                    if (type == ResourceTypes.AttributeBuffer) {
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
                        console.log(bytes);
                        this.gl.uniform4fv(uniform, bytes);
                    }
                }
            });
        });
    }
}

export { GL, ResourceTypes }