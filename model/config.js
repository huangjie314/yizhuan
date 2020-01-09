
var app = {
    dbUrl: 'mongodb://localhost:27017/',
    dbName: 'yizhuan',
    secret: 'jwtSecret', //秘钥
    expiresIn: 60 * 60 * 1 // 过期时间
}

module.exports = app;