/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-17 23:09:55
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-20 15:22:00
*/
// 返回null则不支持webgl
const getGL = (canvas, contextOptions) => {
    let gl = null;

    const validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
    let nameIndex = 0;

    while (!gl && nameIndex < validContextNames.length) {
        const contextName = validContextNames[nameIndex];
        try {
            if (contextOptions) {
                gl = canvas.getContext(contextName, contextOptions);
            } else {
                gl = canvas.getContext(contextName);
            }
        } catch (e) {
            gl = null;
        }

        if (!gl || typeof gl.getParameter !== 'function') {
            gl = null;
        }
        nameIndex += 1;
    }
    return gl;
};

const compileShader = (gl, vertexSource, fragmentSource) => {
    // 1. 创建着色器对象(gl.createShader())
    // 2. 着色器对象中填充着色器程序源代码(gl.shaderSource())
    // 3. 编译器着色器(gl.compileShader())
    // 4. 创建程序对象(gl.createProgram())
    // 5. 为程序对象分配着色器(gl.attachShader())
    // 6. 连接程序对象(gl.linkProgram())
    // 7. 使用程序对象(gl.useProgram())
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (vertexShader ==null || fragmentShader == null) {
        throw new Error(`createShader error vertexShader:${!!vertexShader} fragmentShader:${!!fragmentShader}`);
    }
    gl.shaderSource(vertexShader, vertexSource);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    // attachShader
    const vertexCompiled = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    const fragmentCompiled = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if (!vertexCompiled || !fragmentCompiled) {
        const vertexError = gl.getShaderInfoLog(vertexShader);
        const fragmentError = gl.getShaderInfoLog(fragmentShader);
        throw new Error(`compile shader error vertexError:${vertexError} fragmentError:${fragmentError}`);
    }
    // shader创建成功开始关联程序对象
    const program = gl.createProgram();
    if (!program) {
        throw new Error(`createProgram error:${program}`);
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 连接程序对象
    gl.linkProgram(program);
    gl.useProgram(program);
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        const error = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        throw new Error(`link error:${linked}`);
    }
    return program;
}

export { getGL, compileShader };