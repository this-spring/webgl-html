import { ResourceTypes } from "../core/gl.js";

/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-25 12:55:06
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-25 22:27:34
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
        x, y,
        x, y - height,
        x + width, y,
        x + width, y - height,
    ];
    buffer.push({
        type: ResourceTypes.AttributeBuffer,
        len: 2,
        position: points,
        count: points.length / 2.
    });
    buffer.push({
        type: ResourceTypes.Uniforms,
        len: 4,
        color,
    });
    return buffer;
};

export { rectVertexShader, rectFragmentShader, wrapRectBuffer }  