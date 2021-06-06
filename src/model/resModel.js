/*
import { message } from '../../../../vue-test/Vue-template-develop/src/util/message';
 * @Author: your name
 * @Date: 2021-05-20 22:03:43
 * @LastEditTime: 2021-06-05 21:24:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/model/baseModel.js
 */
class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.error = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.error = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel

}