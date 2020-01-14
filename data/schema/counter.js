/** * 用户信息 */
var mongoose = require('../db2'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    _id: { type: String },
    new: { type: Boolean },
    seq: { type: Number },
}
);

module.exports = mongoose.model('Counter', UserSchema);