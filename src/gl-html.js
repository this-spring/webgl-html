/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-02-18 21:40:17
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-02-23 01:14:13
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
        this.task = [];
        this.doMap = new Map();
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
        for (let i = 0; i < this.task.length; i += 1) {
            const item = this.task[i];
            this.doMap.get(item.type)(item.value);
        }
    }

    _init() {
        this.doMap.set(TaskType.point, this._drawPoint.bind(this));
        if (!initShaders(this.gl, this._getVetexShader(), this._getFragmentShader())) {
            console.error('init shader error');
            return;
        }
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        window.a_Position = this.gl.getAttribLocation(this.gl.program, 'a_Position');
        // const a_PointSize = this.gl.getAttribLocation(this.gl.program, 'a_PointSize');
        window.u_FragColor = this.gl.getUniformLocation(this.gl.program, 'u_FragColor');
        if (!u_FragColor) {
            console.error('u_FragColor error');
        }
    }

    _drawPoint(value) {
        console.log('value:', value);
        this.gl.clear(gl.COLOR_BUFFER_BIT);
        this.gl.uniform4fv(u_FragColor, [value.color.r, value.color.g, value.color.b, value.color.a]);
        this.gl.vertexAttrib2f(a_Position, value.x, value.y);
        // this.gl.vertexAttrib1f(a_PointSize, value.size);
        this.gl.drawArrays(this.gl.POINTS, 0, 1);
    }

    _getVetexShader() {
        const VetexShader = `
            attribute vec4 a_Position;
            attribute float a_PointSize;
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
                gl_FragColor = u_FragColor;
            }
        `;
        return FragmentShader;
    }
}