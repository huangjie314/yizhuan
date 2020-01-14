
var Config = require('../model/config'),
    mongoose = require('mongoose'),

    DB_URL = Config.dbUrl + Config.dbName; /** * 连接 */

mongoose.connect(Config.dbUrl + Config.dbName); /** * 连接成功 */

mongoose.connection.on('connected', function () {

    console.log('Mongoose connection open to ' + DB_URL);
}); /** * 连接异常 */

mongoose.connection.on('error', function (err) {

    console.log('Mongoose connection error: ' + err);
}); /** * 连接断开 */

mongoose.connection.on('disconnected', function () {

    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
