var OrderTplList = require("../schema/orderTplList");
var BaseModel = require("./BaseModel");
/** * 插入 */

class OrderTplListModel extends BaseModel {
    constructor() {
        super(OrderTplList);
        // this.insert({});
    }


}

module.exports = new OrderTplListModel();

