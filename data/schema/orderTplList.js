// 订单模板列表
var mongoose = require('../db2'),
    Schema = mongoose.Schema;
var OrderTplListSchema = new Schema({
    userId: { type: Number, index: true },
    order_sn: { type: Date, default: Date.now() },
    type: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    remark: { type: String, default: '' },
    created_at: { type: Date, default: Date },
    money: { type: Number },
    pay_image: { type: String },
    bank_name: { type: String },
    bank_card: { type: String },
});

module.exports = mongoose.model('OrderTplList', OrderTplListSchema);