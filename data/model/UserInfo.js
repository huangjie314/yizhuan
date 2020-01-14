var UserInfo = require("../schema/userInfo");
const BaseModel = require('./BaseModel');

/** * 插入 */

class UserInfoModel extends BaseModel {
    constructor() {
        super(UserInfo);
    }
}


module.exports = new UserInfoModel();