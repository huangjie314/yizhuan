/** * 绑定店铺/买号 */
var mongoose = require('../db2'),
    Schema = mongoose.Schema;
var BindConfigSchema = new Schema({
    _id: String,
    "platform_type": Array,
    "age": Array,
    "tb_level": Array,
    "jd_level": Array,
    "hb_image": String,
    "zfb_real_name_image": String,
    "zfb_name_and_tb_name_image": String,
    "jd_real_name_image": String,
    "jd_jsz_image": String,
    "jd_bt_image": String,
    "max_account": Number,
    "shop_image": String,
    "max_shop": Number,
});

var BindConfig = mongoose.model('BindConfig', BindConfigSchema);
var BaseModel = require("./BaseModel");
/** * 插入 */

class BindModel extends BaseModel {
    constructor() {
        super(BindConfig);
        // this.insertOne();
    }

    insertOne() {
        this.insert({
            _id: 'bindConfig',
            "platform_type": [
                "淘宝天猫",
                "京东"
            ],
            "age": [
                "18-25岁",
                "26-35岁",
                "35岁以上"
            ],
            "tb_level": [
                "新号",
                "1心",
                "2心",
                "3心",
                "1钻以上"
            ],
            "jd_level": [
                "注册会员",
                "铜牌会员",
                "银牌会员",
                "金牌会员",
                "钻石会员"
            ],
            "hb_image": "/images/hb_image.jpg",
            "zfb_real_name_image": "/images/zfb_real_name_image.jpg",
            "zfb_name_and_tb_name_image": "/images/zfb_name_and_tb_name_image.jpg",
            "jd_real_name_image": "/images/jd_real_name_image.jpg",
            "jd_jsz_image": "/images/jd_jsz_image.jpg",
            "jd_bt_image": "/images/jd_bt_image.jpg",
            "shop_image": "/images/verify_photo6.jpg",
            "max_shop": 20,
            "max_account": 3
        })
    }
}

module.exports = new BindModel();
