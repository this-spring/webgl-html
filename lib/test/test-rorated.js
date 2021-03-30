/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-24 22:48:14
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-30 18:12:59
*/
import { GL, ResourceTypes } from '../core/gl.js';

const canvas = document.querySelector('canvas');
const gl = new GL(canvas);

gl.rotated({
    du: 45
}).translate({
    x: -0.2,
    y: -0.2,
    z: 0.0,
}).scale({
    x: 0.5,
    y: 0.5,
    z: 0.0,
}).drawRect({
    x: -0.2,
    y: 0.2,
    width: 0.4,
    height: 0.4,
    color: [1.0, 0.0, 0.0, 1.0],
});
