const router = require('koa-router')();
const CashListModel = require('../../data/model/CashList');
const userInfoModel = require('../../data/model/UserInfo');
//提现
router.post('/add', async ctx => {
    const json = ctx.request.body;
    const userInfo = ctx.state.userInfo;
    const usermoney = +userInfo.money;
    const commission = +userInfo.commission;
    if (json.type == 0 && json.money > usermoney) {
        return ctx.body = {
            status: 0,
            message: '提交提现申请失败，用户余额不足'
        }
    }
    if (json.type == 1 && json.money > commission) {
        return ctx.body = {
            status: 0,
            message: '提交提现申请失败，用户佣金不足'
        }
    }
    try {
        await CashListModel.insert({
            ...json,
            userId: ctx.state.userInfo.userId
        }).then(res => {
            userInfoModel.update({ userId: ctx.state.userInfo.userId }, { "$inc": { "money": -json.money } })
        });
        return ctx.body = {
            status: 1,
            message: '提交提现申请成功'
        }
    } catch (e) {
        return ctx.body = {
            status: 0,
            message: '提交提现申请失败'
        }
    }
})

module.exports = router.routes();