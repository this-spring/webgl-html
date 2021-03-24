/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-25 00:14:27
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-25 01:09:41
*/
const clearRectVertexShader = `
    attribute vec4 position;
    void main() {
        gl_Position = position;
    }
`;

const clearRectFragmentShader = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4();
    }
`;


// // turn on the scissor test. 
// gl.enable(gl.SCISSOR_TEST); 

// // set the scissor rectangle. 
// gl.scissor(x, y, width, height); 

// // clear. 
// gl.clearColor(r, g, b, a); 
// gl.clear(gl.COLOR_BUFFER_BIT ...); 

// // turn off the scissor test so you can render like normal again. 
// gl.disable(gl.SCISSOR_TEST); 

const wrapClearRectBuffer = (p) => {
    let buffer = [];
    // if ()
    return buffer;
}

export { clearRectVertexShader, clearRectFragmentShader, wrapClearRectBuffer }