/*
 * @Author: your name
 * @Date: 2021-05-20 21:25:07
 * @LastEditTime: 2021-05-30 14:24:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/router/blog.js
 */
const {
    getList,
    getDetail,
    nowBlog,
    upDate,
    del
} = require('../controller/blog');

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel');
//统一的登陆验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('尚未登陆'));
    }
}
const handleBolgRouter = (req, res) => {
    const method = req.method;
    let id = req.query.id;
    //获取博客列表
    if (method === "GET" && req.path === '/api/blog/list') {
        //验证登陆
        const check = loginCheck(req);
        let author = req.query.author || '';
        if (req.query.isAdmin) {
            //管理员界面
            if (check) {
                return check;
            }
            author = req.query.author;
        }

        const keyword = req.query.keyword || '';
        // const list = getList(author, keyword);
        // return new SuccessModel(list);
        const result = getList(author, keyword);
        return result.then(list => {
            return new SuccessModel(list);
        })
    }
    //获取博客详情
    if (method === "GET" && req.path === '/api/blog/detail') {

        // return {
        //     msg: '博客详情'
        // }

        // let author = req.query.author;
        // let detail = getDetail(id);
        // return new SuccessModel(detail);

        //验证登陆
        const check = loginCheck(req);
        if (check) {
            return check;
        }
        let resultDetail = getDetail(id);
        return resultDetail.then(detail => {
            return new SuccessModel(detail);
        })
    }
    //新建博客
    if (method === "POST" && req.path === '/api/blog/new') {
        //验证登陆
        const check = loginCheck(req);
        if (check) {
            return check;
        }
        const author = req.session.username;
        req.body.author = author;
        const result = nowBlog(req.body);
        // return new SuccessModel(data);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }
    //更新博客
    if (method === "POST" && req.path === '/api/blog/update') {
        // return {
        //     msg: '博客更新'
        // }
        //验证登陆
        const check = loginCheck(req);
        if (check) {
            return check;
        }
        const result = upDate(id, req.body);

        return result.then(val => {
            if (val) {
                return new SuccessModel('更新博客成功');
            }
            return new ErrorModel('更新博客失败');
        });
    }
    //博客删除
    if (method === "POST" && req.path === '/api/blog/del') {
        //验证登陆
        const check = loginCheck(req);
        if (check) {
            return check;
        }
        const author = req.session.username; //真实数据
        const result = del(id, author);
        return result.then(val => {
            if (val) {
                return new SuccessModel('删除成功');
            }

            return new ErrorModel('删除博客失败');
        })

    }
}
module.exports = handleBolgRouter;