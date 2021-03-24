/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-23 20:11:24
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-24 13:29:55
*/
import { GL, ResourceTypes } from '../core/gl.js';

const canvas = document.querySelector('canvas');
const gl = new GL(canvas);

gl.drawLine({
    type: ResourceTypes.VEC2,
    points: [
        0, 1,
        1, 0,
        -1, 0,
        0, 1,
    ],
},
{
    type: ResourceTypes.VEC4,
    color: [1.0, 0.0, 0.0, 1.0],
});