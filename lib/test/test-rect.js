/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-24 22:48:14
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-25 22:29:47
*/
import { GL, ResourceTypes } from '../core/gl.js';

const canvas = document.querySelector('canvas');
const gl = new GL(canvas);

gl.drawRect({
    x: -0.2,
    y: 0.2,
    width: 0.4,
    height: 0.4,
    color: [1.0, 0.0, 0.0, 1.0],
});


setTimeout(() => {
    gl.clearRect({
        x: 200,
        y: 200,
        width: 20,
        height: 20
    });
}, 2 * 1000);