/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-24 22:48:14
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-25 01:18:11
*/
import { GL, ResourceTypes } from '../core/gl.js';

const canvas = document.querySelector('canvas');
const gl = new GL(canvas);

gl.drawPoint({
    type: ResourceTypes.VEC2,
    points: [
        0, 0,
        0, 0.5,
        0.5, 0,
        -0.5, 0,
        0, -0.5
    ],
}, {
    type: ResourceTypes.VEC4,
    color: [0.0, 0.0, 1.0, 1.0],
}, 10);

setTimeout(() => {
    gl.clearRect({
        x: 180,
        y: 180,
        width: 40,
        height: 40
    });
}, 2 * 1000);