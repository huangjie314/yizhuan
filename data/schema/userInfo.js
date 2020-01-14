/** * 用户信息表 */
var mongoose = require('../db2'),
    Schema = mongoose.Schema;
var UserInfoSchema = new Schema({
    userId: { type: Number, index: true },
    type: { type: Number, default: 0 },
    platform_type: { type: String },
    mobile: { type: String },
    username: { type: String },
    email: { type: String },
    qq: { type: String },
    real_name: { type: String, default: '' },
    identity: { type: String, default: '' },
    bank_name: { type: String, default: '' },
    bankcard: { type: String, default: '' },
    sex: { type: Number, default: 0 },
    birthday: { type: String, default: '' },
    phone: { type: String, default: '' },
    pid: { type: Number, },
    p_name: { type: String, default: '' },
    province: { type: String, default: '' },
    city: { type: String, default: '' },
    area: { type: String, default: '' },
    money: { type: String, default: '0.00' },
    publishing_point: { type: String, default: '0.00' },
    flow_point: { type: String, default: '0.00' },
    collection_point: { type: String, default: '0.00' },
    integral: { type: String, default: '0.00' },
    address: { type: String, default: '' },
    signature: { type: String, default: '' },
    secret_question: { type: String },
    secret_answer: { type: String },
    mobile_authentication: { type: Number, default: 1 },
    real_name_authentication: { type: Number, default: 0 },
    bank_authentication: { type: Number, default: 0 },
    video_authentication: { type: Number, default: 0 },
    login_time: { type: Date, default: Date.now },
    login_ip: { type: String },
    last_login_time: { type: Date, default: '' },
    last_login_ip: { type: String, default: '' },
    level: { type: Number, default: 0 },
    enable_login_ip_validate: { type: String, default: '' },
    avatar: { type: String, default: '/default/images/user-avatar.png' },
    commission: { type: String, default: '0.00' },
    is_online: { type: Number, default: 1 },
    last_login_ip_info: { type: String, default: '' },
    newest_message_count: { type: Number, default: 0 },
    order_info: {
        type: Object,
        default: {
            "release": 6,
            "wait_for_accept": 6,
            "accepted": 0,
            "wait_for_delivery": 0,
            "wait_for_receive": 0,
            "wait_for_examine": 0,
            "finished": 0
        }
    },
    user_appeal: {
        type: Object,
        default: {
            "send_no_solve": 1,
            "accept_no_solve": 0
        }
    },
    pull_blacklist_count: { type: Number, default: 0 },
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);