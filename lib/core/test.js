/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-19 13:06:24
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-28 19:06:06
 */
import { GL } from './gl.js';
import { resource, resource2 } from './resource.js';
const canvas = document.querySelector('canvas');
const gl = new GL(canvas);
gl.draw(resource)
setTimeout(() => {
    gl.draw(resource2);
}, 2 * 1000);
// var gl = WebGLUtils.setupWebGL(canvas,{preserveDrawingBuffer：true});
