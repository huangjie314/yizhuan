const router = require('koa-router')();

router.use(async (ctx, next) => {
    var type = ctx.state.userInfo.type;
    if (type == 0) {
        await next();
    }
})



router.get('/task/index', async ctx => {
    await ctx.render('default/task/index', {
        title: '任务大厅'
    })
})

router.get('/task/jie', async ctx => {
    await ctx.render('default/task/jie', {
        title: '已参与任务'
    })
})

module.exports = router.routes();
