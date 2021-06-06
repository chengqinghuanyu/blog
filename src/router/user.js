/*
import { query } from '@angular/animations';
 * @Author: your name
 * @Date: 2021-05-20 21:25:13
 * @LastEditTime: 2021-05-30 13:45:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/router/user.js
 */
const {
    login
} = require('../controller/user');
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel');
const {
    set
} = require('../db/redis');
//获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    console.log('cookies:支持的时间', d.toGMTString());
    return d.toGMTString();
}
const handleUserRouter = (req, res) => {
    const method = req.method;

    //获取博客列表
    if (method === "POST" && req.path === '/api/user/login') {
        const {
            username,
            password
        } = req.body;
        // const {
        //     username,
        //     password
        // } = req.query;
        const result = login(username, password);
        return result.then(data => {
            if (data.username) {
                //res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly;expires=${getCookieExpires()}`);
                //设置session
                req.session.username = data.username;
                req.session.realname = data.realname;
                console.log('req.session', req.session);
                //同步到red is
                set(req.sessionId, req.session)
                return new SuccessModel('登陆成功');
            }
            return new ErrorModel('登陆失败')
        })

    }
    //test
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     // if (req.cookie.username) {
    //     //     return Promise.resolve(new SuccessModel({
    //     //         username: req.cookie.username
    //     //     }));
    //     // }
    //     // return Promise.resolve(new ErrorModel('尚未登陆'));
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session
    //         }));
    //     }
    //     return Promise.resolve(new ErrorModel('尚未登陆'));
    // }
}

module.exports = handleUserRouter;