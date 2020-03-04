const router = require('koa-router')();
const userInfoModel = require('../../data/model/UserInfo');
const captialConfig = require('../../data/model/CaptalConfig');


router.use(async (ctx, next) => {
    try {
        const captial = await captialConfig.find();
        ctx.state.captialConfig = captial.length ? captial[0] : [];
        next();
    } catch (e) {
        return ctx.body = {
            state: 0,
            message: '操作失败'
        }
    }

})
// 资金兑换
router.post('/add', async ctx => {
    const { type, value } = ctx.request.body;
    const { userId, publishing_point, integral } = ctx.state.userInfo;
    const { exchange_integral, exchange_points } = ctx.state.captialConfig;
    let money, doc = {};
    if (type == 0) {
        // 发布点兑换
        money = value * (+exchange_points.proportion);
        doc = { "publishing_point": -value };
        if (value < +exchange_points.min) {
            return ctx.body = {
                status: 0,
                message: '兑换失败，发布点' + exchange_points.min + '点起兑换'
            }
        }
        if (value > +publishing_point) {
            return ctx.body = {
                status: 0,
                message: '兑换失败，发布点不足'
            }
        }
    } else if (type == 1) {
        money = value * (+exchange_integral.proportion);
        doc = { "integral": -value };
        if (value < +exchange_integral.min) {
            return ctx.body = {
                status: 0,
                message: '兑换失败，积分' + exchange_integral.min + '分起兑换'
            }
        }
        if (value > +integral) {
            return ctx.body = {
                status: 0,
                message: '兑换失败，积分不足'
            }
        }
    }
    try {
        userInfoModel.update({ userId: userId }, { "$inc": { ...doc, "money": money } })
        return ctx.body = {
            status: 1,
            message: '兑换成功'
        }
    } catch (e) {
        return ctx.body = {
            status: 0,
            message: '兑换失败'
        }
    }
})


module.exports = router.routes();