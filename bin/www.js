/*
 * @Author: your name
 * @Date: 2021-05-19 21:01:09
 * @LastEditTime: 2021-05-19 21:04:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/bin/www.js
 */
const http = require('http');
const PORT = 8000;
const serverHandle = require('../aap.js');
const server = http.createServer(serverHandle);
server.listen(PORT);