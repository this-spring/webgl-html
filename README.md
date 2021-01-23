<!--
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-01-23 01:08:03
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-01-23 14:53:18
-->
# webgl-html
render data by webgl, no html、css

## design  

一个前端想法，可以有一定加密和防爬策略。  

1. 前端生成一个random，用random作为对称机密的public key然后拿着非对称机密public key对randmo和请求参数进行请求加密（生成算法可以通过wasm写更安全些）
2. 后端那private进行解密拿到random和请求参数，完成查询后用random进行对称加密，返回给前端。
3. 前端拿到数据后利用random进行解密，拿到真实数据
4. 通过webgl-html以canvas的形式渲染数据，这样实现没有dom的渲染。
5. 实现数据传输和数据展示的加密  

## webgl-html  
example中实现了4步骤中简单的文本渲染到canvas上，mvvm方式渲染。