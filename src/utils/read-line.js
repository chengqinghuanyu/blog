/*
 * @Author: your name
 * @Date: 2021-06-05 11:05:15
 * @LastEditTime: 2021-06-05 13:19:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/utils/read-line.js
 */

const fs = require('fs');
const path = require('path');
const readLine = require('readline');
//文件名
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log');
//创建readstream
const readstream = fs.createReadStream(fileName);
//创建deadline对象
const rl = readLine.createInterface({
    input: readstream //固定参数名称input
})

let chromeNumber = 0;
let sum = 0;
//监听数据流入
rl.on('line', (lineData) => {
    if (!lineData) {
        return
    }
    sum++;
    const arr = lineData.split('--');
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        chromeNumber++;
        //累加
    }
})
//执行完成
rl.on('close', () => {

    console.log('chrome占比：', sum ? (chromeNumber / sum) : 0);
})