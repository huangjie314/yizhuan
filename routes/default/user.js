const router = require('koa-router')();


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




module.exports = router.routes();