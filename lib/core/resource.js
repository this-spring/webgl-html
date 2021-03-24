/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-19 13:08:07
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-24 13:13:23
*/
import { ResourceTypes } from './gl.js';
const vexterShader = `
    attribute vec4 position;
    attribute vec4 color;
    varying vec4 v_color;
    void main() {
        gl_Position = position;
        v_color = color;
    }
`;

const fragementShader = `
    precision mediump float;
    varying vec4 v_color;
    void main() {
        gl_FragColor = v_color;
    }
`;

// gl.POINTS: 绘制一系列点。
// gl.LINE_STRIP: 绘制一个线条。即，绘制一系列线段，上一点连接下一点。
// gl.LINE_LOOP: 绘制一个线圈。即，绘制一系列线段，上一点连接下一点，并且最后一点与第一个点相连。
// gl.LINES: 绘制一系列单独线段。每两个点作为端点，线段之间不连接。
// gl.TRIANGLE_STRIP：绘制一个三角带。
// gl.TRIANGLE_FAN：绘制一个三角扇。
// gl.TRIANGLES: 绘制一系列三角形。每三个点作为顶点。

const buffer = [
    {
        type: ResourceTypes.AttributeBuffer,
        len: 3,
        position: [
            0.1, 0.0, 0.0,
            0.2, 0.0, 0.0,
            0.3, 0.0, 0.0,, 
            0.4, 0.0, 0.0,
            0.5, 0.0, 0.0,]
    },
    {
        type: ResourceTypes.AttributeBuffer,
        len: 3,
        color: [
            0.0, 0.0, 1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 
        ]
    },
    "POINTS"
];

const buffer2 = [
    {
        type: ResourceTypes.AttributeBuffer,
        len: 3,
        position: [
            0.0, 0.1, 0.0,
            0.0, 0.2, 0.0,
            0.0, 0.3, 0.0,, 
            0.0, 0.4, 0.0,
            0.0, 0.5, 0.0,]
    },
    {
        type: ResourceTypes.AttributeBuffer,
        len: 3,
        color: [
            0.0, 0.0, 1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 
        ]
    },
];
const resource = {
    vs: vexterShader,
    fs: fragementShader,
    buffer,
}
const resource2 = {
    vs: vexterShader,
    fs: fragementShader,
    buffer: buffer2,
    type: "POINTS",
}
export { resource, resource2 }