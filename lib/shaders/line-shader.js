import { ResourceTypes } from "../core/gl.js";

/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-23 20:09:23
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-24 13:33:05
*/
const vertexShader = `
    attribute vec4 position;
    void main() {
        gl_Position = position;
    }
`;

const fragmentShader = `
    precision mediump float;
    uniform vec4 color;
    void main() {
        gl_FragColor = color;
    }      
`;

const wrapBuffer = (points, colors) => {
    let buffer = [];
    if (points.type === ResourceTypes.VEC2) {
        buffer.push({
            type: ResourceTypes.AttributeBuffer,
            len: 2,
            position: points.points,
            pointCount: points.points.length / 2,
        });
    }
    if (colors.type === ResourceTypes.VEC4) {
        buffer.push({
            type: ResourceTypes.Uniforms,
            color: colors.color
        })
    }
    return buffer;
}

export { vertexShader, fragmentShader, wrapBuffer }