/*
 * @Author: your name
 * @Date: 2021-05-29 11:56:50
 * @LastEditTime: 2021-06-05 13:35:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/db/mysql.js
 */
const mysql = require('mysql');
const {
    MY_SQL_CONFIG
} = require('../config/db.js');
const con = mysql.createConnection(MY_SQL_CONFIG);
con.connect();
//新建统一执行mysql 文件
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return
            }
            resolve(result);
        });
    })
    return promise;
}
module.exports = {
    exec,
    escape: mysql.escape
};