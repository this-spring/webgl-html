/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-25 23:54:39
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-29 12:49:47
*/

class Matrix {
    static origin = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(src) {
        const element = !!src ? src : Matrix.origin;
        this.element = new Float32Array(element);        
    }

    reset() {
        this.element = new Float32Array(Matrix.origin);
    }
    /**
     * 原始坐标
     * @param {*} vec4 
     */
    multiply(vec4) {
        for (let i = 0; i < 4; i += 1) {
            let matrix0 = [i * 4 + 0], martix1 = [i * 4 + 1], martix2 = [i * 4 + 2], matrix3 = [i * 4 + 3];
            
        }
    }
} 