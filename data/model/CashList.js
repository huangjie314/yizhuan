// 提现model

const mongoose = require('../db2'),
    Schema = mongoose.Schema;
const CashListSchema = new Schema({
    userId: { type: Number, index: true },
    type: { type: Number },
    money: { type: Schema.Types.Decimal128 },
    code_type: { type: Number },
    code_image: { type: String },
    status: { type: Number, default: 0 },
    remark: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const CashList = mongoose.model('CashList', CashListSchema);

const BaseModel = require('./BaseModel');

class CashListModel extends BaseModel {
    constructor() {
        super(CashList);
    }
}

module.exports = new CashListModel();