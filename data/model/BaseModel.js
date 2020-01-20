

class BaseModel {
    constructor(model) {
        this.model = model;
    }

    insert(json) {
        var modelInstance = new this.model(json);
        return new Promise((resolve, reject) => {
            modelInstance.save(function (err, res) {
                if (err) {
                    reject(err);
                    console.log("Error:" + err);
                } else {
                    resolve(res);
                    // console.log("Res:" + res);
                }
            });
        })
    }

    update(conditions, doc) {
        return new Promise((resolve, reject) => {
            this.model.update(conditions, doc, function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                    reject(err);
                } else {
                    // console.log("Res:" + res);
                    resolve(res);
                }
            })
        })
    }

    remove(conditions) {
        return new Promise((resolve, reject) => {
            this.model.remove(conditions, function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                    reject(err);
                } else {
                    // console.log("Res:" + res);
                    resolve(res);
                }
            })
        })
    }

    find(conditions) {
        return new Promise((resolve, reject) => {
            this.model.find(conditions, function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                    reject(err);
                } else {
                    // console.log("Res:" + res);
                    resolve(res);
                }
            })
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            this.model.findById(id, function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                    reject(err);
                } else {
                    // console.log("Res:" + res);
                    resolve(res);
                }
            })
        })
    }

    getCountByConditions(conditions) {
        return new Promise((resolve, reject) => {
            this.model.count(conditions, function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                    reject(err);
                }
                else {
                    // console.log("Res:" + res);
                    resolve(res);
                }
            })
        })
    }
}

module.exports = BaseModel;