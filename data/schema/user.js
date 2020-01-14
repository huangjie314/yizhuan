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

module.exports = mongoose.model('User', UserSchema);