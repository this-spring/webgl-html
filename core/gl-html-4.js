/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-03 23:56:21
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-05 12:57:44
 */
/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-03 00:53:16
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-03 01:23:00
*/
/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-02-18 21:40:17
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-02-24 19:53:17
*/
const TaskType = {
    kx: 'kx',
}
class GlHtml {
    constructor(opt) {
        this.id = opt.id;
        this.canvas = document.getElementById(this.id);
        // this.context = this.canvas.getContext('2d');
        this.gl = getWebGLContext(this.canvas);
        this.rect = this.canvas.getBoundingClientRect();
        this.left = 0;
        this.right = 0;
        this.heigith = 0;
        this.width = 0;
        this.task = [];
        this.doMap = new Map();
        this.attribute = {
            a_Position: '',
            a_PointSize: '',
        };
        this.uniform = {
            u_FragColor: '', 
        };
        this._init();
    }

    drawSin() {
        this._doTask();
    }

    fillRect() {
    }

    _doTask() {
       this._drawSin();
    }

    _drawSin() {
        let scale = 0.01;
        let circle = 30;
        let dx = Math.PI/180.0;
        let points = [];
        for (let x = -Math.PI*circle; x < Math.PI*circle;  x += dx) {
            let y = Math.sin(x);
            let x1 = x*scale;
            y = y*scale;
            points.push(x1, y);
        }
        console.log(points);
        const buffer = this._createBuffer();
        const n = this._configVertex(buffer, new Float32Array(points), this.attribute.a_Position,
        2, 0, 2);
        this.gl.drawArrays(this.gl.LINE_STRIP, 0, n);
    }

    _init() {
        this.left = this.rect.left;
        this.right = this.rect.right;
        this.width = this.canvas.width;
        this.heigith = this.canvas.height;
        if (!initShaders(this.gl, this._getVetexShader(), this._getFragmentShader())) {
            console.error('init shader error');
            return;
        }
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.attribute.a_Position = this.gl.getAttribLocation(this.gl.program, 'a_Position');
        // this.uniform.u_FragColor = this.gl.getUniformLocation(this.gl.program, 'u_FragColor');
        // if (!this.uniform.u_FragColor) {
        //     console.error('u_FragColor error');
        // }
    }

    _transformLen(len) {
        const l = 2 * len / this.canvas.width;
        return l;
    }

    _transformPosition(x, y) {
        const rx = (x - this.canvas.height / 2) / (this.canvas.height / 2);
        const ry = (this.canvas.width / 2 - y) / (this.canvas.width / 2);
        return {
            x: rx,
            y: ry,
        };
    }
    
    _createBuffer() {
        const buffer = this.gl.createBuffer();
        return buffer;
    }

    _configVertex(buffer, bytes, vary, len, start, total) {
        const fsize = bytes.BYTES_PER_ELEMENT;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, bytes, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(vary, len, this.gl.FLOAT, false, total * fsize, start * fsize, 0);
        this.gl.enableVertexAttribArray(vary);
        return bytes.length / 2;
    }

    _getVetexShader() {
        const VetexShader = `
            attribute vec4 a_Position;
            void main() {
                gl_Position = a_Position;
                gl_PointSize = 10.0;
            }
        `;
        return VetexShader;
    }

    _getFragmentShader() {
        const FragmentShader = `
            precision mediump float;
            uniform vec4 u_FragColor;
            void main() {
                gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
            }
        `;
        return FragmentShader;
    }
}