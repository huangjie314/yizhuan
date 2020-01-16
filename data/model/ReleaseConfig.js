var ReleaseConfig = require("../schema/releaseConfig");
var BaseModel = require("./BaseModel");
/** * 插入 */

class ReleaseModel extends BaseModel {
    constructor() {
        super(ReleaseConfig);
        this.insertOne();
    }

    insertOne() {
        this.insert({
            "_id": 'releaseConfig',
            "base": 8,
            "good_comment": 0.5,
            "append_good_comment_publishing_point": [
                {
                    "index": 1,
                    "day": 2,
                    "value": 1
                },
                {
                    "index": 2,
                    "day": 3,
                    "value": 1.5
                },
                {
                    "index": 3,
                    "day": 4,
                    "value": 2
                },
                {
                    "index": 4,
                    "day": 5,
                    "value": 2.5
                },
                {
                    "index": 5,
                    "day": 6,
                    "value": 3
                },
                {
                    "index": 6,
                    "day": 7,
                    "value": 3.5
                }
            ],
            "good_comment_delete_order": 0.8,
            "collection_shop_and_goods": 0.3,
            "add_carts_next_days_buy": [
                {
                    "index": 1,
                    "day": 1,
                    "value": 1
                }
            ],
            "ask_question": 0.5,
            "share_goods": 0.5,
            "hb_and_credit_card_pay": 1,
            "account_level": [
                {
                    "index": 1,
                    "level": 1,
                    "value": 0.2
                },
                {
                    "index": 2,
                    "level": 2,
                    "value": 0.4
                },
                {
                    "index": 3,
                    "level": 3,
                    "value": 0.6
                },
                {
                    "index": 4,
                    "level": 4,
                    "value": 0.8
                },
                {
                    "index": 5,
                    "level": 5,
                    "value": 1
                }
            ],
            "opening_hb_and_bt": 0.5,
            "account_value": [
                {
                    "index": 1,
                    "number": 300,
                    "value": 0.2
                },
                {
                    "index": 2,
                    "number": 500,
                    "value": 0.5
                },
                {
                    "index": 3,
                    "number": 600,
                    "value": 0.8
                },
                {
                    "index": 4,
                    "number": 700,
                    "value": 1
                },
                {
                    "index": 5,
                    "number": 800,
                    "value": 1.2
                },
                {
                    "index": 6,
                    "number": 900,
                    "value": 1.5
                },
                {
                    "index": 7,
                    "number": 1000,
                    "value": 1.8
                },
                {
                    "index": 8,
                    "number": 1200,
                    "value": 2
                },
                {
                    "index": 9,
                    "number": 1500,
                    "value": 2.5
                }
            ],
            "limit_user_receive_tasks": [
                {
                    "index": 1,
                    "number": 1,
                    "value": 0.1
                },
                {
                    "index": 2,
                    "number": 2,
                    "value": 0.1
                },
                {
                    "index": 3,
                    "number": 3,
                    "value": 0.1
                },
                {
                    "index": 4,
                    "number": 1,
                    "value": 0.1
                },
                {
                    "index": 5,
                    "number": 2,
                    "value": 0.1
                },
                {
                    "index": 6,
                    "number": 3,
                    "value": 0.1
                },
                {
                    "index": 7,
                    "number": 1,
                    "value": 0.1
                },
                {
                    "index": 8,
                    "number": 2,
                    "value": 0.1
                },
                {
                    "index": 9,
                    "number": 3,
                    "value": 0.1
                }
            ],
            "limit_area": 0.3,
            "limit_sex": 0.5,
            "limit_age": 0.5,
            "platform_service_charge": 1,
            "examine_account_time": 10
        })
    }
}

module.exports = new ReleaseModel();
