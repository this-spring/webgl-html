<!--
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-01-23 01:08:03
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-28 19:12:02
-->
## webgl-html  
通过webgl渲染一个UI，没有任何dom。 所有源码均在lib下，其他目录为本人学习和测试目录。 

## 设计
1. 初步先完成基本Api（画线等操作）。
2. 考虑组件如何布局，结合第一步中的Api组合成高级Api渲染，例如button等组件。
3. 通过proxy实现数据的双向绑定实现mvvm。  

目前完成部分第一部分内容

## 基本Api  
所有源码未与lib目录下，采用ESM开发方式，不需要npm任何插件。该库提供两种方式让你调用webgl。  

### 第一种  

直接调用内部封装好的Api，不需要自己写shader，目前已经实现了canvas2d的一部分Api。如下：  

#### 画圆  

```
src/test/tes-circle.html  

import { GL, ResourceTypes } from '../core/gl.js';

const canvas = document.querySelector('canvas');
const gl = new GL(canvas);
gl.drawCircle({
    x: 0.2, 
    y: 0.2,
    r: 0.2,
    color: [1.0, 0.0, 0.0, 1.0]
});
```

### 画点  
```
src/test/test-point.html  
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
```

### 画线  
```
src/test/test-line.html  
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
```

### 画矩形  

```
src/test/test-rect.html
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

```

### 局部清除  
```
src/test/test-clearrect.html

import { GL, ResourceTypes } from '../core/gl.js';

const canvas = document.querySelector('canvas');
const gl = new GL(canvas)
gl.clearRect({
    x: 180,
    y: 180,
    width: 40,
    height: 40
});
```

### 第二种  
自己写shader  

调用方式参考src/core/test.html  
gl.draw(resource)  
draw api说明
```
const { vs, fs, buffer, type } = source;
resource包括：  
vs: 顶点着色器
fs: 片元着色器
buffer: 数据内容  
type: 指定绘制模式

注：
绘制模式包括：  
const DrawTypes = {
    POINTS: 'POINTS',
    LINE_STRIP: 'LINE_STRIP',
    LINE_LOOP: 'LINE_LOOP',
    LINES: 'LINES',
    TRIANGLE_STRIP: 'TRIANGLE_STRIP',
    TRIANGLE_FAN: 'TRIANGLE_FAN',
    TRIANGLES: 'TRIANGLES',
};
```

```
src/core/test.html 
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
```
实际上第一种中的所有Api都是通过调用第二种draw方法实现的，只不过改库把点、线、圆等api的shader都写好了。如果想自己写shader可以使用第二种Api。

## 高级组件Api编写  

TODO  

## Mvvm实现  
TODO

## other  

一个前端想法，可以有一定加密和防爬策略。  

1. 前端生成一个random，用random作为对称机密的public key然后拿着非对称机密public key对randmo和请求参数进行请求加密（生成算法可以通过wasm写更安全些）
2. 后端那private进行解密拿到random和请求参数，完成查询后用random进行对称加密，返回给前端。
3. 前端拿到数据后利用random进行解密，拿到真实数据
4. 通过webgl-html以canvas的形式渲染数据，这样实现没有dom的渲染。
5. 实现数据传输和数据展示的加密  