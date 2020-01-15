/** * 用户信息表 */
var mongoose = require('../db2'),
    Schema = mongoose.Schema;
var UserInfoSchema = new Schema({
    capitalId: {
        type: Number,
        index: true,
    },
    "login_integral": Number,
    "platform_service_charge": Number,
    "user_order_point_proportion": Number,
    pay_to_bank_name: String,
    pay_to_bank_card: String,
    pay_to_real_name: String,
    "authentication_real_name": {
        type: Object,
        default: {
            "times": 5,
            "money": 1
        }
    },
    "authentication_bank_card": {
        type: Object,
        default: {
            "times": 5,
            "money": 1
        }
    },
    "pull_blacklist": {
        type: Object,
        default: {
            "times": 10,
            "money": 0.5
        }
    },
    "buy_points": {
        type: Array,
        default: [
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
        ]
    },
    "exchange_points": {
        type: Object,
        default: {
            "min": 1,
            "proportion": 0.95
        }
    },
    "exchange_integral": {
        type: Object,
        default: {
            "min": 100,
            "proportion": 0.02
        }
    }
});

module.exports = mongoose.model('CaptialConfig', UserInfoSchema);