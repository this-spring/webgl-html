/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-29 19:53:34
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-30 18:25:45
*/
// 支持vec4类型
class Transform {
    /**
     * 
     * @param {*} postion 
     * @param {*} matrix 
     * @param {*} vec 
     * @returns 
     */
    // 平移
    static translate(position, matrix) {
        if (matrix[0] == 0 && matrix[1] == 0 && matrix[2] == 0) return position;
        for (let i = 0; i < position.length; i += 1) {
            let changIndex = parseInt(i % 3);
            // console.log(i, changIndex, matrix[changIndex]);
            position[i] += matrix[changIndex];
        }
        return position;
    }
    // 旋转
    static rotated(position, du) {
        if (du % 360 == 0) return position;
        const rdu = du * Math.PI / 180;
        const cosdu = Math.cos(rdu);
        const sindu = Math.sin(rdu);
        for (let i = 0; i < position.length; i += 3) {
            let x = position[i], y = position[i + 1], z = position[i + 2];
            position[i] = x * cosdu - y * sindu;
            position[i + 1] = x * sindu + y * cosdu;
            position[i + 2] = z;
        }
        return position;
    }
    // 缩放
    static scale(position, matrix) {
        if (matrix[0] == 1 && matrix[1] == 1 && matrix[2] == 1) return;
        const x = matrix[0], y = matrix[1], z = matrix[2];
        for (let i = 0; i < position.length; i += 3) {
            position[i] *= x;
            position[i + 1] *= y;
            position[i + 2] *= z;
        }
        return position;
    }
}

export { Transform }