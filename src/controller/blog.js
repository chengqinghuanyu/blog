/*
 * @Author: your name
 * @Date: 2021-05-20 22:15:45
 * @LastEditTime: 2021-06-05 14:28:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/controller/blog.js
 */
const {
    exec,
    escape
} = require('../db/mysql');
const xss = require('xss');
const getList = (author, keyword) => {
    // 1=1,避免输入查询为空时候引擎错误
    let sql = `select id,title,author,content from blogs where 1=1 `;

    if (author) {
        sql += `and author=${author} ${escape('')}`;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' ` + escape('');
    }
    sql += `order by createtime desc;`;
    console.log(sql);
    return exec(sql);
}

const getDetail = (id) => {
    id = escape(id);
    let sql = `select * from blogs where id=${id};`;
    //console.log(sql);
    return exec(sql).then(rows => {
        return rows[0];
    });
}
//
const nowBlog = (blogData = {}) => {
    //blogData是博客的数据
    //console.log('newBLog', blogData);
    // return {
    //     id: 3 //新建博客返回的ID
    // }
    const title = escape(xss(blogData.title));
    const content = escape(xss(blogData.content));
    const author = escape(xss(blogData.author));
    const createtime = Date.now();
    let sql = `insert into blogs(title,content,createtime,author) values(${title},${content},${createtime},${author})`;
    return exec(sql).then(inserData => {
        //console.log('返回数据', inserData);
        return {
            id: inserData.insertId
        }
    })
}

const upDate = (id, blog = {}) => {
    //id: 3 //更新博客返回的ID
    const title = escape(xss(blog.title));
    const content = escape(xss(blog.content));
    id = escape(id)
    console.log(blog);
    let sql = `update  blogs set title=${title},content=${content} where id=${id};`;
    return exec(sql).then(updateData => {
        // console.log('返回数据', updateData);
        //affectedRows更新数据
        if (updateData.affectedRows > 0) {
            return true;
        }
        return false;
    })


}
const del = (id, author) => {
    // console.log('delId', id);
    id = escape(id);
    author = escape(author)
    const sql = `delete from blogs where id=${id} and author=${author} `;

    return exec(sql).then(deleteData => {
        // console.log('返回数据', deleteData);
        //affectedRows删除数据
        if (deleteData.affectedRows > 0) {
            return true;
        }
        return false
    })
    // if (id) {
    //     return true;
    // }
    // return false;
}
module.exports = {
    getList,
    getDetail,
    nowBlog,
    upDate,
    del
}