/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-02-18 21:40:17
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-02-25 00:51:09
*/
const TaskType = {
    point: 'point',
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

    drawPoint(opt) {
        this.task.push({
            type: TaskType.point,
            value: opt
        });
        this._doTask();
    }

    fillRect() {
    }

    _doTask() {
        // for (let i = 0; i < this.task.length; i += 1) {
        //     const item = this.task[i];
        //     this.doMap.get(item.type)(item.value);
        // }
        window.clearTimeout(window.tid);
        window.tid = setTimeout(() => {
            this._drawPoints();
        }, 0);
    }

    _init() {
        this.doMap.set(TaskType.point, this._drawPoint.bind(this));
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
        // this.attribute.a_PointSize = this.gl.getAttribLocation(this.gl.program, 'a_PointSize');
        // this.uniform.u_FragColor = this.gl.getUniformLocation(this.gl.program, 'u_FragColor');
        // if (!this.uniform.u_FragColor) {
        //     console.error('u_FragColor error');
        // }
    }

    _drawPoints() {
        const n = this._initVertexBuffer();
        this.gl.drawArrays(gl.POINTS, 0, n);
    }

    _initVertexBuffer() {
        const vertexArr = [];
        for (let i = 0; i < this.task.length; i += 1) {
            const item = this.task[i].value;
            const v = this._transformPosition(item.x, item.y);
            vertexArr.push(v.x);
            vertexArr.push(v.y);
        }
        const fvertexArr = new Float32Array(vertexArr);
        const vertexBuffer = this.gl.createBuffer();
        if (!vertexBuffer) {
            console.log("fail to create buffer");
            return -1;
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, fvertexArr, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.attribute.a_Position, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.attribute.a_Position);
        return fvertexArr.length / 2;
    }

    _drawPoint(value) {
        this.gl.clear(gl.COLOR_BUFFER_BIT);
        const v = this._transformPosition(value.x, value.y);
        this.gl.uniform4fv(this.uniform.u_FragColor, [value.color.r, value.color.g, value.color.b, value.color.a]);
        this.gl.vertexAttrib2f(this.attribute.a_Position, v.x, v.y);
        this.gl.vertexAttrib1f(this.attribute.a_PointSize, value.size);
        this.gl.drawArrays(this.gl.POINTS, 0, 1);
    }

    _transformPosition(x, y) {
        const rx = (x - this.canvas.height / 2) / (this.canvas.height / 2);
        const ry = (this.canvas.width / 2 - y) / (this.canvas.width / 2);
        return {
            x: rx,
            y: ry,
        };
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
                gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
        `;
        return FragmentShader;
    }
}