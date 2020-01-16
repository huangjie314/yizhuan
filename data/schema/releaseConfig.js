/** * 用户信息表 */
var mongoose = require('../db2'),
    Schema = mongoose.Schema;
var ReleaseSchema = new Schema({
    "_id": String,
    "base": Number,
    "good_comment": Number,
    "append_good_comment_publishing_point": Array,
    "good_comment_delete_order": Number,
    "collection_shop_and_goods": Number,
    "add_carts_next_days_buy": Array,
    "ask_question": Number,
    "share_goods": Number,
    "hb_and_credit_card_pay": Number,
    "account_level": Array,
    "opening_hb_and_bt": Number,
    "account_value": Array,
    "limit_user_receive_tasks": Array,
    "limit_area": Number,
    "limit_sex": Number,
    "limit_age": Number,
    "platform_service_charge": Number,
    "examine_account_time": Number
});

module.exports = mongoose.model('ReleaseConfig', ReleaseSchema);