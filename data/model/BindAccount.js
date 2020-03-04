var BaseModel = require("./BaseModel");

// 绑定买号
var mongoose = require('../db2'),
    Schema = mongoose.Schema;

var BindAccountSchema = new Schema({
    userId: { type: Number, index: true },
    platform_type: Number, // 平台类型
    buy_name: String,
    is_real_name: Number,
    hb_bt: Number,
    sex: Number,
    age: Number,
    level: { type: Number, default: 0 },
    value: Number,
    image_1: String,
    image_2: String,
    image_3: String,
    status: {
        type: Number,
        default: 0
    },
    total_today_orders: { type: Number, default: 0 },
    total_week_orders: { type: Number, default: 0 },
    total_month_orders: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

var BindAccount = mongoose.model('BindAccount', BindAccountSchema);

class BindAccountModel extends BaseModel {
    constructor() {
        super(BindAccount);
    }
}

module.exports = new BindAccountModel();