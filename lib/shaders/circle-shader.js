import { ResourceTypes } from "../core/gl.js";

/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-25 22:37:59
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-25 23:25:15
*/
const circleVertexShader = `
    attribute vec4 position;
    void main() {
        gl_Position = position;
    }
`;

const circleFragmentShader = `
    precision highp float;
    uniform vec4 color;
    void main() {
        gl_FragColor = color;
    }
`;

const wrapCircleBuffer = (resource) => {
    const { x, y, r, color } = resource;
    let buffer = [];
    const points = [];
    const count = 3600;
    for (let i = 0; i < count; i += 1) {
        const dx = 360 / count;
        const du = dx * i * Math.PI / 180;
        const x1 = r * Math.cos(du) + x;
        const y1 = r * Math.sin(du) + x;
        points.push(x1, y1)
    }
    buffer.push({
        type: ResourceTypes.AttributeBuffer,
        len: 2,
        position: points,
        count: points.length / 2,
    });
    buffer.push({
        type: ResourceTypes.Uniforms,
        len: 4,
        color
    });
    return buffer;
};

export { circleVertexShader, circleFragmentShader, wrapCircleBuffer }