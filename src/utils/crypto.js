/*
 * @Author: your name
 * @Date: 2021-06-05 14:34:01
 * @LastEditTime: 2021-06-05 14:54:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/utils/crp.js
 */
const crypto = require('crypto');
//密钥
const SECRET_KEY = "Wjol_8766#";

function MD5(content) {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

//加密函数
function genPasswords(password) {
    const str = `password=${password}&key=${SECRET_KEY}`;
    return MD5(str);
}
let result1 = genPasswords('123');
console.log(result1);

let result = genPasswords('456');
console.log(result);
module.exports = {
    genPasswords
}