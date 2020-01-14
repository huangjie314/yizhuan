var User = require("../schema/user");
var BaseModel = require("./BaseModel");
/** * 插入 */

class UserModel extends BaseModel {
    constructor() {
        super(User);
    }
}

module.exports = new UserModel();

