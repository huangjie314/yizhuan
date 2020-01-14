var Counter = require("../schema/counter");
/** * 插入 */

module.exports = {
    findByIdAndUpdate(key) {
        return new Promise((resolve, reject) => {
            Counter.findOneAndUpdate({ _id: { $in: key } }, { $inc: { seq: 1 } }, {
                new: true,
            }, function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                    reject(err)
                } else {
                    console.log("Res:" + res);
                    resolve(res.seq);
                }
            })
        })
    }
}