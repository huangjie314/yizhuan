const router = require('koa-router')();
const ReleaseModel = require('../../data/model/ReleaseConfig')
const OrderTplListModel = require('../../data/model/OrderTplList');
const BindConfigModel = require('../../data/model/BindConfig');
var BindShopModel = require('../../data/model/BindShop');

router.use(async (ctx, next) => {
    var type = ctx.state.userInfo.type;
    if (type == 1) {
        await next();
    }
})


router.get('/task/add', async ctx => {
    var result = await ReleaseModel.find({ "_id": "releaseConfig" });
    const tplList = await OrderTplListModel.find({ userId: ctx.session.userId, platform_type: 0 });
    var shopList = await BindShopModel.find({ "platform_type": 0 });
    await ctx.render('default/task/add', {
        title: '发布任务',
        release: result[0]._doc,
        tplList: tplList,
        shopList: shopList
    })
})

router.get('/task/add-18', async ctx => {
    var result = await ReleaseModel.find({ "_id": "releaseConfig" });
    const tplList = await OrderTplListModel.find({ userId: ctx.session.userId, platform_type: 1 });
    var shopList = await BindShopModel.find({ "platform_type": 1 });
    await ctx.render('default/task/add-18', {
        title: '发布任务',
        release: result[0]._doc,
        tplList: tplList,
        shopList: shopList
    })
})

router.get('/task/fa', async ctx => {
    await ctx.render('default/task/fa', {
        title: '已发布任务',
        templates: []
    })
})
router.get('/task/task_template', async ctx => {
    const tplList = await OrderTplListModel.find({ userId: ctx.session.userId });
    await ctx.render('default/task/task_template', {
        title: '任务模板',
        tplList: tplList
    })
})

router.get('/bind_account', async ctx => {
    var result = await BindConfigModel.find({ "_id": "bindConfig" });
    var shopList = await BindShopModel.find();
    await ctx.render('default/user/bind_account/shop', {
        title: '绑定店铺',
        bind: result[0]._doc,
        shopList: shopList
    })
})


module.exports = router.routes();