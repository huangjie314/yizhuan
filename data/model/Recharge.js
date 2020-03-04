
/** * 提现表 */
var mongoose = require('../db2'),
    Schema = mongoose.Schema;
var RechargeSchema = new Schema({
    userId: { type: Number, index: true },
    order_sn: { type: Date, default: Date.now() },
    type: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    remark: { type: String, default: '' },
    // created_at: { type: Date, default: Date },
    money: { type: Schema.Types.Decimal128 },
    pay_image: { type: String },
    bank_name: { type: String },
    bank_card: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

var Recharge = mongoose.model('Recharge', RechargeSchema);
var BaseModel = require("./BaseModel");
/** * 插入 */

class RechargeModel extends BaseModel {
    constructor() {
        super(Recharge);
    }
}

module.exports = new RechargeModel();

