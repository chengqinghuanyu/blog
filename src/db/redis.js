/*
 * @Author: your name
 * @Date: 2021-05-30 13:10:30
 * @LastEditTime: 2021-05-30 13:18:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/db/redis.js
 */
const redis = require('redis');
const {
    REDIS_CONFIG
} = require('../config/db');
//创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
redisClient.on('err', (err) => {
    console.log(err);
})

function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return
            }
            if (val == null) {
                resolve(null);
            }
            //try-cath为了兼容数据做的
            try {
                resolve(JSON.parse(val));
            } catch (error) {
                resolve(val);
            }
        })
    })
    return promise;
};
module.exports = {
    get,
    set
}