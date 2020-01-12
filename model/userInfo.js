
const DB = require('./db');

class UserInfo {
    constructor(json) {
        this.data = Object.assign(
            {
                "mobile": "",
                "username": json.mobile,
                "email": "",
                "qq": "",
                "real_name": "",
                "identity": "",
                "bank_name": "",
                "bankcard": "",
                "sex": 0,
                "birthday": "",
                "phone": "",
                "pid": 0,
                "province": "广东",
                "city": "深圳",
                "area": "南山",
                "money": "0.00",
                "publishing_point": "0.00",
                "flow_point": "0.00",
                "collection_point": "0.00",
                "integral": 0,
                "type": 0,
                "address": "",
                "signature": "",
                "secret_question": "",
                "secret_answer": "",
                "mobile_authentication": 1,
                "real_name_authentication": 0,
                "bank_authentication": 0,
                "video_authentication": 0,
                "login_time": "",
                "login_ip": "",
                "last_login_time": null,
                "last_login_ip": "",
                "level": 0,
                "enable_login_ip_validate": 1,
                "avatar": "",
                "commission": "0.00",
                "is_online": 0,
                "last_login_ip_info": "中国广东深圳电信",
                "newest_message_count": 0,
                "order_info": {
                    "release": 6,
                    "wait_for_accept": 6,
                    "accepted": 0,
                    "wait_for_delivery": 0,
                    "wait_for_receive": 0,
                    "wait_for_examine": 0,
                    "finished": 0
                },
                "user_appeal": {
                    "send_no_solve": 1,
                    "accept_no_solve": 0
                },
                "pull_blacklist_count": 1,
            }, json);
        this.collectionName = 'userInfo';
    }

    async insert() {
        try {
            const result = await DB.insert(this.collectionName, this.data);
            return result;
        } catch (err) {

        }
    }

    static async find(userId) {
        try {
            const result = await DB.find('userInfo', { userId: userId });
            return result && result[0];
        } catch (err) {

        }
    }

}

module.exports = UserInfo;