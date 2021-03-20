/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-18 19:07:45
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-20 15:23:12
*/
import { getGL, compileShader } from '../utils/gl-help.js';

const ResourceTypes = {
    AttributeBuffer: 'AttributeBuffer',
    Uniforms: 'Uniforms',
}

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
        const { vs, fs, buffer } = source;
        const program = compileShader(this.gl, vs, fs);
        // 编译着色器
        if (!program) {
            console.error('compiled gl error');
            return;
        }
        this.gl.program = program;
        const blen = buffer.length;
        this._settingBuffer(buffer.splice(0, blen - 1));
        const drawType = buffer[blen - 1];
        this.gl.drawArrays(this.gl.LINES, 0, 5);
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
                        const buffer = this.gl.createBuffer();
                        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
                        this.gl.bufferData(this.gl.ARRAY_BUFFER, bytes, this.gl.STATIC_DRAW);
                        this.gl.vertexAttribPointer(uniform, len, this.gl.FLOAT, false, 0 , 0); 
                        this.gl.enableVertexAttribArray(uniform);
                    }
                }
            });
        });
    }
}

export { GL, ResourceTypes }