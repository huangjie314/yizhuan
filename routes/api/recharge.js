
var router = require('koa-router')();
const tools = require('../../util/tools');


const fs = require('fs');
const path = require('path');
const RechargeModel = require('../../data/model/Recharge');



// 用户注册
router.post('/add', async (ctx) => {
    var json = ctx.request.body;
    json = Object.assign(json, { userId: ctx.session.userId })
    var result = await RechargeModel.insert(json).catch(err => {
        return ctx.body = {
            status: 10004,
            message: "提交充值余额申请失败",
            data: []
        }
    });
    return ctx.body = {
        status: 1,
        message: "提交充值余额申请成功",
        data: []
    }
})



module.exports = router.routes();