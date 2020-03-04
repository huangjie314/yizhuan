var BaseModel = require("./BaseModel");

// 绑定店铺
var mongoose = require('../db2'),
    Schema = mongoose.Schema;

var BindShopSchema = new Schema({
    platform_type: Number, // 平台类型
    shop_name: String, // 店铺名称,
    shop_image: String, // 店铺后台截图
    shop_account: String, // 旺旺账号
    is_real_name: { // 是否实名认证
        type: Number,
        default: 1
    },
    status: { // 店铺状态
        type: Number,
        default: 1
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

var BindShop = mongoose.model('BindShop', BindShopSchema);

class BindShopModel extends BaseModel {
    constructor() {
        super(BindShop);
    }
}

module.exports = new BindShopModel();