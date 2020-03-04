
// 订单模板列表
var mongoose = require('../db2'),
    Schema = mongoose.Schema;
var OrderTplListSchema = new Schema({
    userId: { type: Number, index: true },
    platform_type: Number,
    order_type: Number,
    shop_id: String,
    shop_name: String,
    goods_url: String,
    goods_title: String,
    goods_image: String,
    pay_type: Number,
    goods_price: String,
    order_goods_number: Number,
    search_show_goods_price: String,
    buy_assign_attribute: String,
    search_show_pay_numbers: Number,
    is_need_change_price: Number,
    goods_type: Number,
    goods_good_comment_rule: Number,
    express_type: Number,
    assign_goods_comment_content: String,
    platform_message_tips: String,
    place_order_type: Number,
    goods_tips_content: String,
    is_need_three_shops: Number,
    is_need_in_shop_browse: Number,
    is_need_stop_before_buy: Number,
    is_need_full_browse: Number,
    good_comment_images: String,
    append_good_comment: String,
    is_need_delete_order_after_good_comment: Number,
    is_need_collection_shop_and_goods: Number,
    is_need_add_carts_next_days_buy: Number,
    is_need_ask_question: Number,
    ask_question_content: Number,
    is_need_share_goods: Number,
    is_can_hb_and_credit_card_pay: Number,
    is_need_user_account_opening_hb_and_bt: Number,
    user_account_level: Number,
    user_account_value: Number,
    is_need_chats_before_pay: Number,
    is_need_examine_account: Number,
    limit_user_accept_order_number: Number,
    order_limit_province: Number,
    order_limit_sex: Number,
    order_limit_age: Number,
    template_name: String,
    order_price: String,
    order_points: String,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
var OrderTplList = mongoose.model('OrderTplList', OrderTplListSchema);
var BaseModel = require("./BaseModel");
/** * 插入 */

class OrderTplListModel extends BaseModel {
    constructor() {
        super(OrderTplList);
        // this.insert({});
    }


}

module.exports = new OrderTplListModel();

