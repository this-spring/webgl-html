import { ResourceTypes } from "../core/gl.js";

/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-25 12:55:06
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-30 13:33:57
*/
const rectVertexShader = `
    attribute vec4 position;
    void main() {
        gl_Position = position;
    }
`;

const rectFragmentShader = `
    precision mediump float;
    uniform vec4 color;
    void main() {
        gl_FragColor = color;
    }
`;

const wrapRectBuffer = (resource) => {
    let buffer = [];
    const { x, y, width, height, color } = resource;
    let points = [
        x, y, 0,
        x, y - height, 0,
        x + width, y, 0, 
        x + width, y - height, 0,
    ];
    buffer.push({
        type: ResourceTypes.AttributeBuffer,
        len: 3,
        position: points,
        count: points.length / 3.
    });
    buffer.push({
        type: ResourceTypes.Uniforms,
        len: 4,
        color,
    });
    return buffer;
};

export { rectVertexShader, rectFragmentShader, wrapRectBuffer }  