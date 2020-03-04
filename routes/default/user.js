const router = require('koa-router')();
const CaptalConfig = require('../../data/model/CaptalConfig');
const rechargeModel = require('../../data/model/Recharge');


router.get('/proinfo', async (ctx) => {
    await ctx.render('default/user/center/proinfo', {
        title: '个人资料'
    })
})


router.get('/password', async (ctx) => {
    await ctx.render('default/user/center/password', {
        title: '登录密码'
    })
})

router.get('/repassword', async (ctx) => {
    await ctx.render('default/repassword', {
        title: '取回登录密码'
    })
})

router.get('/twopassword', async (ctx) => {
    await ctx.render('default/user/center/twopassword', {
        title: '支付密码'
    })
})

router.get('/repaypassword', async (ctx) => {
    await ctx.render('default/repaypassword', {
        title: '取回支付密码'
    })
})

router.get('/avatar', async (ctx) => {
    await ctx.render('default/user/center/avatar');
})


router.get('/amount/recharge', async ctx => {
    var result = await CaptalConfig.find();
    await ctx.render('default/user/amount/recharge', {
        title: '账户充值',
        capital: result[0]._doc
    })
})

router.get('/amount/log', async ctx => {
    const list = await rechargeModel.find({ userId: ctx.state.userInfo.userId });
    await ctx.render('default/user/amount/log', {
        title: '充值记录',
        list: list
    })
})

router.get('/tixian/apply', async ctx => {
    const config = await CaptalConfig.find();
    await ctx.render('default/user/tixian/apply', {
        title: '余额提现',
        capital: config.length ? config[0] : []
    })
})

router.get('/exchange/index', async ctx => {
    const config = await CaptalConfig.find();
    await ctx.render('default/user/exchange/index', {
        title: '兑换资金',
        capital: config.length ? config[0] : []
    })
})

router.get('/amount/list', async ctx => {
    const list = await rechargeModel.find({ userId: ctx.state.userInfo.userId });
    await ctx.render('default/user/amount/list', {
        title: '资金明细',
        item: {}
    })
})


router.get('/cards/buy', async ctx => {
    var result = await CaptalConfig.find({});
    await ctx.render('default/user/cards/buy', {
        title: '购买发布点',
        buy_points: result[0]._doc.buy_points
    })
})

router.get('/userspread/spread', async ctx => {
    // var result = await CaptalConfig.find({});
    await ctx.render('default/user/userspread/spread', {
        title: '推广赚钱',
        // capital: result[0]._doc
    })
})

router.get('/userspread/list', async ctx => {
    // var result = await CaptalConfig.find({});
    await ctx.render('default/user/userspread/list', {
        title: '我推广的用户',
        // capital: result[0]._doc
    })
})




module.exports = router.routes();