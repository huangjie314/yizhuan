const router = require('koa-router')();
const ReleaseModel = require('../../data/model/ReleaseConfig')
const OrderTplListModel = require('../../data/model/OrderTplList');

router.use(async (ctx, next) => {
    var type = ctx.state.userInfo.type;
    if (type == 1) {
        await next();
    }
})


router.get('/task/add', async ctx => {
    var result = await ReleaseModel.find({ "_id": "releaseConfig" });
    var tplList = await OrderTplListModel.find();
    await ctx.render('default/task/add', {
        title: '发布任务',
        release: result[0]._doc,
        tplList: tplList
    })
})
router.get('/task/fa', async ctx => {
    await ctx.render('default/task/fa', {
        title: '已发布任务',
        templates: []
    })
})
router.get('/task/task_template', async ctx => {

    await ctx.render('default/task/task_template', {
        title: '任务模板',
        tplList: []
    })
})

module.exports = router.routes();