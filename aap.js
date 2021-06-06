/*
import { cookie } from 'js-cookie';
 * @Author: your name
 * @Date: 2021-05-19 21:02:52
 * @LastEditTime: 2021-06-05 10:15:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/aap.js
 */
const handleUserRouter = require('./src/router/user.js');
const handleBlogRouter = require('./src/router/blog.js');
const queryString = require('querystring');
// //存储session
// const SESSION_DATA = {};
const {
    access
} = require('./src/utils/log')
const {
    get,
    set
} = require('./src/db/redis')
//获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    console.log('cookies:支持的时间', d.toGMTString());
    return d.toGMTString();
}
const getPostData = (req) => {
    /**
     * 处理promise
     */
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return
            }
            resolve(JSON.parse(postData));
        })
    })
    return promise
}

const serverHandel = (req, res) => {
    //记录access log
    access(`${
        req.method
    }--${req.url}--${req.headers['user-agent']}--${Date()}`)
    //设置返回格式
    res.setHeader('Content-type', 'application/json');
    // const resData = {
    //     name: 'yinpx10022',
    //     site: 'immoc',
    //     //当前的环境
    //     env: process.env.NODE_ENV
    // };
    // res.end(JSON.stringify(resData));


    //获取path
    const url = req.url;
    req.path = url.split('?')[0];
    //解析query
    req.query = queryString.parse(url.split('?')[1]);
    //解析cookies
    const cookieStr = req.headers.cookie || ''
    req.cookie = {};
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1];
        req.cookie[key] = val;
    });
    console.log('iscookies', req.cookie);
    //解析session
    // let userId = req.cookie.userId;
    // let needSetCookie = false;
    // if (req.cookie.userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }

    // } else {
    //     needSetCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`;
    //     SESSION_DATA[userId] = {};
    // }
    // req.session = SESSION_DATA[userId];

    //redis实现存储
    let needSetCookie = false;
    let userId = req.cookie.userId;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        set(userId, {})
    }
    //获取session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            //初始化red is的sessionId
            set(req.sessionId, {});
            //设置session的值
            req.session = {};
        } else {
            //设置session的值
            req.session = sessionData;
        }
        console.log('req.session', req.session);
        return getPostData(req);
    }).then(postData => {
        //通过req.body 来处理postData
        if (postData) {
            req.body = postData
        }
        //处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            // res.end(JSON.stringify(blogData));
            // return;

            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);

                }
                res.end(JSON.stringify(blogData));
            })
            return
        }
        //处理用户
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);

                }
                res.end(JSON.stringify(userData));

            })
            return;

        }

        //处理未命中的路由返回404
        res.writeHead(404, {
            'content-type': 'text/plain'
        })
        res.write('404 not found\n');
        res.end()
    })

};
module.exports = serverHandel;