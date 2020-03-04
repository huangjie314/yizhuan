// 订单管理
// 绑定店铺/买号
const router = require('koa-router')();
const math = require('mathjs');
const tools = require('../../util/tools');
const OrderModel = require('../../data/model/Order');
const UserInfo = require('../../data/model/UserInfo');
const OrderTplList = require('../../data/model/OrderTplList');

router.post('/add', async ctx => {
    const json = ctx.request.body;
    const result = await UserInfo.find({ userId: ctx.session.userId });
    const order_price = +json.order_price;
    const order_points = +json.order_points;
    const template_name = json.template_name;
    if (+result[0].money < order_price) {
        return ctx.body = {
            status: 0,
            message: '用户金额不足，请充值'
        }
    }
    if (+result[0].publishing_point < order_points) {
        return ctx.body = {
            status: 0,
            message: '用户发布点不足，请充值'
        }
    }
    try {
        Object.assign(json, { userId: ctx.session.userId });
        await OrderModel.insert(json).then(async () => {
            const _sumPoint = tools.parseNumber(math.add(+result[0].publishing_point, -order_points));
            const _sumMoney = tools.parseNumber(math.add(+result[0].money, -order_price));
            await UserInfo.update({ userId: ctx.session.userId }, { "$set": { "publishing_point": _sumPoint, 'money': _sumMoney } });
            if (!!template_name && template_name != 0) {
                await OrderTplList.insert(json);
            }
        });
        return ctx.body = {
            status: 1,
            message: '订单发布成功',
        }
    } catch (err) {
        return ctx.body = {
            status: 10004,
            message: '订单发布失败',
        }
    }
})

module.exports = router.routes();