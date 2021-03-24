/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-03-24 23:51:24
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-03-25 00:10:05
*/
const UniformMapping = {
    1: (gl, position, value) => gl.uniform1fv(position, value),
    2: (gl, position, value) => gl.uniform2fv(position, value),
    3: (gl, position, value) => gl.uniform3fv(position, value),
    4: (gl, position, value) => gl.uniform4fv(position, value),
}
const setUniforms = (gl, position, value, len) => {
    UniformMapping[len](gl, position, value);
};

export { setUniforms }  