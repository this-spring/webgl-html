/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-02-18 21:40:17
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-02-25 19:19:35
*/
const TaskType = {
    point: 'point',
    triangle: 'triangle',
    square: 'square',
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

    drawSquare(opt) {
        this.task.push({
            type: TaskType.point,
            value: opt
        });
        this._doTask();
    }

    drawPoint(opt) {
        this.task.push({
            type: TaskType.point,
            value: opt
        });
        this._doTask();
    }

    drawTriangles(opt) {
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
            this._drawSquare();
        }, 0);
    }

    _init() {
        this.doMap.set(TaskType.point, this._drawPoint.bind(this));
        this.doMap.set(TaskType.triangle, this._drawTriangles.bind(this));
        this.doMap.set(TaskType.square, this._drawSquare.bind(this));
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

    _drawSquare() {
        const n = this._initVertexBuffer();
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, n);
    }

    _drawTriangles() {
        const n = this._initVertexBuffer();
        this.gl.drawArrays(this.gl.TRIANGLES, 0, n);
    }

    _drawPoints() {
        const n = this._initVertexBuffer();
        this.gl.drawArrays(this.gl.POINTS, 0, n);
    }

    _initVertexBuffer() {
        const vertexArr = [];
        for (let i = 0; i < this.task.length; i += 1) {
            const item = this.task[i].value;
            const p1 = this._transformPosition(item.p1.x, item.p1.y);
            vertexArr.push(p1.x);
            vertexArr.push(p1.y);
            const p2 = this._transformPosition(item.p2.x, item.p2.y);
            vertexArr.push(p2.x);
            vertexArr.push(p2.y);
            const p3 = this._transformPosition(item.p3.x, item.p3.y);
            vertexArr.push(p3.x);
            vertexArr.push(p3.y);
            const p4 = this._transformPosition(item.p4.x, item.p4.y);
            vertexArr.push(p4.x);
            vertexArr.push(p4.y);
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