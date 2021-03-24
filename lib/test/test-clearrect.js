/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-23 20:11:24
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-25 01:07:35
*/
import { GL, ResourceTypes } from '../core/gl.js';

const canvas = document.querySelector('canvas');
const gl = new GL(canvas);

gl.clearRect({
    type: ResourceTypes.VEC2,
    x: -0.2,
    y: 0.2,
    height: 0.4,
    width: 0.4,
});