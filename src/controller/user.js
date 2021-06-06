/*
 * @Author: your name
 * @Date: 2021-05-22 18:02:25
 * @LastEditTime: 2021-06-05 14:52:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/controller/user.js
 */
const {
    exec,
    escape
} = require('../db/mysql');
const {
    genPasswords
} = require('../utils/crypto')
const login = (username, password) => {
    username = escape(username);
    password = genPasswords(password);
    password = escape(password);
    const sql = `select * from users where username = ${username}
    and password = ${password}
    `;
    return exec(sql).then(rows => {
        console.log('shu', rows[0]);
        return rows[0] || {}

    });
}
module.exports = {
    login
};