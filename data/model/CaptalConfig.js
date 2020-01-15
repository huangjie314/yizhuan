var User = require("../schema/capitalConfig");
var BaseModel = require("./BaseModel");
/** * 插入 */

class CapitalModel extends BaseModel {
    constructor() {
        super(User);
        // this.insertOne();
    }

    insertOne() {
        this.insert({
            capitalId: 1,
            pay_to_bank_name: '中国银行',
            pay_to_bank_card: '123456789',
            pay_to_real_name: '张三',
            "login_integral": 1,
            "platform_service_charge": 1,
            "user_order_point_proportion": 0.8,
            "authentication_real_name": {
                "times": 5,
                "money": 1
            },
            "authentication_bank_card": {
                "times": 5,
                "money": 1
            },
            "pull_blacklist": {
                "times": 10,
                "money": 0.5
            },
            "buy_points": [
                {
                    "point": 1,
                    "money": 1
                },
                {
                    "point": 10,
                    "money": 10
                },
                {
                    "point": 100,
                    "money": 98
                },
                {
                    "point": 500,
                    "money": 485
                },
                {
                    "point": 1000,
                    "money": 960
                }
            ],
            "exchange_points": {
                "min": 1,
                "proportion": 0.95
            },
            "exchange_integral": {
                "min": 100,
                "proportion": 0.02
            }
        })
    }
}

module.exports = new CapitalModel();
