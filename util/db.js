/**

 * http://mongodb.github.io/node-mongodb-native

 * http://mongodb.github.io/node-mongodb-native/3.0/api/
 */

//DB��
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;

var Config = require('./config');

class Db {

    static getInstance() {   /*1������  ���ʵ����ʵ��������������*/

        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }

    constructor() {

        this.dbClient = ''; /*���� ��db����*/
        // this.connect();   /*ʵ������ʱ����������ݿ�*/

    }

    connect() {  /*�������ݿ�*/
        let _that = this;
        return new Promise((resolve, reject) => {
            if (!_that.dbClient) {         /*1��������ݿ������ӵ�����*/
                MongoClient.connect(Config.dbUrl, (err, client) => {

                    if (err) {
                        reject(err)

                    } else {
                        _that.dbClient = client.db(Config.dbName);
                        resolve(_that.dbClient)
                    }
                })

            } else {
                resolve(_that.dbClient);

            }


        })

    }

    find(collectionName, json) {

        return new Promise((resolve, reject) => {

            this.connect().then((db) => {

                var result = db.collection(collectionName).find(json);

                result.toArray(function (err, docs) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(docs);
                })

            })
        })
    }
    update(collectionName, json1, json2) {
        return new Promise((resolve, reject) => {


            this.connect().then((db) => {

                //db.user.update({},{$set:{}})
                db.collection(collectionName).updateOne(json1, {
                    $set: json2
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })

            })

        })

    }
    insert(collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {

                db.collection(collectionName).insertOne(json, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {

                        resolve(result);
                    }
                })


            })
        })
    }

    remove(collectionName, json) {

        return new Promise((resolve, reject) => {
            this.connect().then((db) => {

                db.collection(collectionName).removeOne(json, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {

                        resolve(result);
                    }
                })


            })
        })
    }
    getObjectId(id) {   /*mongodb里面查询 _id 把字符串转换成对象*/
        return new ObjectID(id);
    }

    getNextSequence(name) {
        return new Promise((resolve, reject) => {
            this.dbClient.collection('counter').findAndModify(
                { _id: name },
                [['_id', 'asc']],
                { $inc: { seq: 1 } },
                { new: true },
                function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result.value.seq);
                }
            );
        })

    }

}


module.exports = Db.getInstance();
