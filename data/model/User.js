
/** * 用户表 */
var mongoose = require('../db2'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    _id: { type: Number },
    platform_type: { type: String },
    password: { type: String },
    pay_password: { type: String },
    qq: { type: String },
    mobile: { type: String },
    p_name: { type: String },
    type: { type: Number },
}
    // , {
    //     collection: 'admin',
    //     versionKey: false,
    //     // timestamps: true 
    //     timestamps: {
    //         createdAt: true,
    //         updatedAt: true,
    //     }
);

var User = mongoose.model('User', UserSchema);
var BaseModel = require("./BaseModel");
/** * 插入 */

class UserModel extends BaseModel {
    constructor() {
        super(User);
    }
}

module.exports = new UserModel();

