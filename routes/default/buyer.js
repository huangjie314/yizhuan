const router = require('koa-router')();

const BindConfigModel = require('../../data/model/BindConfig');
const BindShopModel = require('../../data/model/BindShop');
const bindAccountModel = require('../../data/model/BindAccount');
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

router.get('/bind_account', async ctx => {
    const { platformType } = ctx.request.query;
    var result = await BindConfigModel.find({ "_id": "bindConfig" });
    var accountList = await bindAccountModel.find({ userId: ctx.state.userInfo.userId });
    await ctx.render('default/user/bind_account/add', {
        title: '绑定买号',
        platformType,
        bind: result[0]._doc,
        list: accountList
    })
})



module.exports = router.routes();
