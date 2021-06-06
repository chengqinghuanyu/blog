/*
import { createWriteStream } from 'fs';
 * @Author: your name
 * @Date: 2021-06-05 10:01:17
 * @LastEditTime: 2021-06-05 11:18:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/utils/log.js
 */

const fs = require('fs');
const path = require('path');
//写日志
function Writelog(writeStream, log) {
    writeStream.write(log + '\n'); //关键代码
}
//生成stream
function CreateWriteStream(fileName) {
    const fullPath = path.join(__dirname, '../', '../', 'logs', fileName);
    const writeSream = fs.createWriteStream(fullPath, {
        flags: 'a'
    })
    return writeSream
}
//写访问日志
const accessWriteStream = CreateWriteStream('access.log');

function access(log) {
    Writelog(accessWriteStream, log)
}
module.exports = {
    access
}