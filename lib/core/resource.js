/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-19 13:08:07
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-20 15:30:22
*/
import { ResourceTypes } from './gl.js';
const vexterShader = `
    attribute vec4 position;
    void main() {
        gl_Position = position;
    }
`;

const fragementShader = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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
    // {
    //     type: ResourceTypes.Uniforms,
    //     len: 3,
    //     color: [
    //         1.0, 0.0, 0.0,
    //         1.0, 0.0, 0.0,
    //         0.0, 1.0, 0.0,
    //         0.0, 1.0, 0.0,
    //         0.0, 0.0, 1.0, 
    //     ]
    // },
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
    // {
    //     type: ResourceTypes.Uniforms,
    //     len: 3,
    //     color: [
    //         1.0, 0.0, 0.0,
    //         1.0, 0.0, 0.0,
    //         0.0, 1.0, 0.0,
    //         0.0, 1.0, 0.0,
    //         0.0, 0.0, 1.0, 
    //     ]
    // },
    "POINTS"
];
const resource = {
    vs: vexterShader,
    fs: fragementShader,
    buffer,
}
const resource2 = {
    vs: vexterShader,
    fs: fragementShader,
    buffer: buffer2
}
export { resource, resource2 }