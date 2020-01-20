const router = require('koa-router')();
var CaptalConfig = require('../../data/model/CaptalConfig');


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
    var result = await CaptalConfig.find({});
    await ctx.render('default/user/amount/recharge', {
        title: '账户充值',
        capital: result[0]._doc
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