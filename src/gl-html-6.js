/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-02 19:24:33
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-02 20:29:25
*/
/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-02-18 21:40:17
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-02-26 16:32:05
*/
const TaskType = {
    point: 'point',
    triangle: 'triangle',
    square: 'square',
    picture: 'picture',
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
            a_TexCoord: '',
        };
        this.uniform = {
            u_Sampler: '',
        };
        this.buffer = {
            createBuffer: '',
            createTextureBuffer: '',
        }
        this._init();
    }

    drawPicture(opt) {
        this.task.push({
            type: TaskType.point,
            value: opt
        });
        this._doTask();
    }

    fillRect() {
    }

    _doTask() {
        window.clearTimeout(window.tid);
        window.tid = setTimeout(() => {
            this._drawPicture();
        }, 0);
    }

    _init() {
        // this.doMap.set(TaskType.point, this._drawPoint.bind(this));
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
        this.attribute.a_TexCoord = this.gl.getAttribLocation(this.gl.program, 'a_TexCoord');
        this.uniform.u_Sampler = this.gl.getUniformLocation(this.gl.program, 'u_Sampler');
        this.buffer.createBuffer = this.gl.createBuffer(); // 创建缓冲区
        this.buffer.createTextureBuffer = this.gl.createTexture(); // 创建纹理对象
    }

    _transformPosition(x, y) {
        const rx = (x - this.canvas.height / 2) / (this.canvas.height / 2);
        const ry = (this.canvas.width / 2 - y) / (this.canvas.width / 2);
        return {
            x: rx,
            y: ry,
        };
    }
   
    _drawPicture() {
        var n = this._initVertexBuffer();
        this._initTexture();
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, n);
    }

    _initVertexBuffer() {
        var verticesTexCoords = new Float32Array([
            -0.5, 0.5, 0.0, 1.0,
            -0.5, -0.5, 0.0, 0.0,
            0.5, 0.5, 1.0, 1.0,
            0.5, -0.5, 1.0, 0.0
        ]);
        const fsize = verticesTexCoords.BYTES_PER_ELEMENT;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer.createBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticesTexCoords, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.attribute.a_Position, 2, this.gl.FLOAT, false, 4 * fsize, 0);
        this.gl.enableVertexAttribArray(this.attribute.a_Position);
        // 纹理坐标
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer.createBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticesTexCoords, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.attribute.a_TexCoord, 2, this.gl.FLOAT, false, 4 * fsize, fsize * 2);
        this.gl.enableVertexAttribArray(this.attribute.a_TexCoord);

        return verticesTexCoords.length / 4;
    }

    _initTexture() {
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.buffer.createTextureBuffer);
        // 配置纹理
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        // 配置纹理图像
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, image);
        // 
        this.gl.uniform1i(this.uniform.u_Sampler, 0);
    }
    
    _getVetexShader() {
        const VetexShader = `
            attribute vec4 a_Position;
            attribute vec2 a_TexCoord;
            varying vec2 v_TexCoord;
            void main() {
                gl_Position = a_Position;
                v_TexCoord = a_TexCoord;
            }
        `;
        return VetexShader;
    }

    _getFragmentShader() {
        const FragmentShader = `
            precision mediump float;
            uniform sampler2D u_Sampler;
            varying vec2 v_TexCoord;
            void main() {
                gl_FragColor = texture2D(u_Sampler, v_TexCoord);
            }
        `;
        return FragmentShader;
    }
}