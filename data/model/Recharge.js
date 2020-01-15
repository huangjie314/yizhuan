var Recharge = require("../schema/recharge");
var BaseModel = require("./BaseModel");
/** * 插入 */

class RechargeModel extends BaseModel {
    constructor() {
        super(Recharge);
    }
}

module.exports = new RechargeModel();

