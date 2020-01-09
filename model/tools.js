
var md5 = require('md5');
const jwt = require('jsonwebtoken'); // 用于签发、解析`token`
const config = require('./config');
const request = require('request');

let tools = {
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
    }
}

module.exports = tools;