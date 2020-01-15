
var md5 = require('md5');
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const config = require('./config');
const request = require('request');
const DB = require('./db');
const UserInfo = require('./userInfo');
var MongoDB = require('mongodb');
var ObjectID = MongoDB.ObjectID;

let tools = {
    getObjectId(id) {   /*mongodb里面查询 _id 把字符串转换成对象*/
        return new ObjectID(id);
    },

    md5(str) {
        return md5(str)
    },

    // 访问需要认证的接口时，需要在request头附带Authorization: Bearer[token]字段。

    verifyToken(token) {
        // 验证并解析JWT
        if (token) {
            return jwt.verify(token, config.secret);
        }
    },

    signToken(payload = {}) {
        return jwt.sign(payload, config.secret, { expiresIn: config.expiresIn })
    },

    request(opts = {}) {
        return new Promise((resolve, reject) => {
            request(opts.queryUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const jsonObj = JSON.parse(body);
                    resolve(jsonObj)
                } else {
                    reject('请求异常');
                }
            })
        })
    },

    verifySmsCode(code) {
        if (code == 123456) {
            return true;
        }
    },

    async getUserInfo(userId) {
        const result = await UserInfo.find(userId);
        return result;
    },

    setUserInfo(json) {
        new UserInfo(json).insert();
    },

    formatMobile: function (mobile) {
        return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },




}

module.exports = tools;