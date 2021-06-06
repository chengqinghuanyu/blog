/*
 * @Author: your name
 * @Date: 2021-05-29 11:51:22
 * @LastEditTime: 2021-05-30 13:28:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/config/db.js
 */

const env = process.env.NODE_ENV;
let MY_SQL_CONFIG;
let REDIS_CONFIG;
if (env === 'dev') {
    MY_SQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: 6379
    }
}
if (env === 'production') {
    MY_SQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: 6379
    }
}
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
})

con.connect();

module.exports = {
    MY_SQL_CONFIG,
    REDIS_CONFIG
}