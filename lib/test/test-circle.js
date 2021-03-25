/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-24 22:48:14
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-25 23:42:44
*/
import { GL, ResourceTypes } from '../core/gl.js';

const canvas = document.querySelector('canvas');
const gl = new GL(canvas);

gl.translate({
    x: 0.2,
    y: 0.2,
    z: 0,
}).drawCircle({
    x: 0.2, 
    y: 0.2,
    r: 0.2,
    color: [1.0, 0.0, 0.0, 1.0]
});