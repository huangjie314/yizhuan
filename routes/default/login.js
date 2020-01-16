
const router = require('koa-router')();


router.get('/login', async (ctx) => {
    await ctx.render('default/login', {
        title: '登录'
    });
})



router.get('/register', async (ctx) => {
    await ctx.render('default/register', {
        title: '注册'
    });
})

router.get('/register/:type', async (ctx) => {
    const { type } = ctx.params;
    const title = type === 'buyer' ? '会员注册' : '商家注册';
    await ctx.render('default/registerDetail', {
        type,
        title
    });
})

router.get('/repassword', async (ctx) => {
    await ctx.render('default/repassword');
})




module.exports = router.routes();