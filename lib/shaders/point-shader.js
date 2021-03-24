import { ResourceTypes } from "../core/gl.js";

/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-23 20:09:12
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-24 23:41:15
*/
const pointVertexShader = `
    attribute vec4 position;
    uniform float size;
    void main() {
        gl_Position = position;
        gl_PointSize = size;
    }
`;

const pointFragmentShader = `
    precision mediump float;
    uniform vec4 color;
    void main() {
        gl_FragColor = color;
    }
`;

const pointWrapBuffer = (points, colors, size) => {
    let buffer = [];
    if (points.type === ResourceTypes.VEC2) {
        buffer.push({
            type: ResourceTypes.AttributeBuffer,
            len: 2,
            position: points.points,
            count: points.points.length / 2,
        });
    }
    if (colors.type === ResourceTypes.VEC4) {
        buffer.push({
            type: ResourceTypes.Uniforms,
            len: 4,
            color: colors.color,
        });
    }
    buffer.push({
        type: ResourceTypes.Uniforms,
        len: 1,
        size: size
    });
    return buffer;
};

export { pointVertexShader, pointFragmentShader, pointWrapBuffer }