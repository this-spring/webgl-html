/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-24 22:48:14
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-30 13:03:14
*/
import { GL, ResourceTypes } from '../core/gl.js';

const canvas = document.querySelector('canvas');
const gl = new GL(canvas);

// const res = gl.translate({
//     x: 0.4,
//     y: 0.4,
//     z: 0
// }).drawPoint({
//     type: ResourceTypes.VEC3,
//     points: [
//         0, 0, 0
//     ],
// }, {
//     type: ResourceTypes.VEC4,
//     color: [0.0, 0.0, 1.0, 1.0],
// }, 10);

const res = gl.translate({
        x: 0,
        y: 0.4,
        z: 0
    }).drawPoint({
        type: ResourceTypes.VEC3,
        points: [
            0, 0, 0
        ],
    }, {
        type: ResourceTypes.VEC4,
        color: [0.0, 0.0, 1.0, 1.0],
    }, 10);