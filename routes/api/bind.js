// 绑定店铺/买号
const router = require('koa-router')();
const tools = require('../../util/tools');
const BindShopModel = require('../../data/model/BindShop');
const bindAccountModel = require('../../data/model/BindAccount');
const userInfoModel = require('../../data/model/UserInfo');

router.post('/shop', async ctx => {
    var json = ctx.request.body;
    try {
        var result = await BindShopModel.insert(json);
        ctx.body = {
            status: 1,
            message: '用户绑定店铺成功',
            data: []
        }
    } catch (err) {
        ctx.body = {
            status: 10004,
            message: '用户绑定店铺失败',
            data: []
        }
    }
})

router.post('/shop/:type/:id', async ctx => {
    var json = ctx.params;
    var type = json.type;
    var id = tools.getObjectId(json.id);
    try {
        if (type == 'del') {
            var result = await BindShopModel.remove({ "_id": id });
            return ctx.body = {
                status: 1,
                message: '删除店铺成功',
                data: []
            }
        }
        if (type == 'update') {
            return ctx.body = {
                status: 1,
                message: '更新成功',
                data: []
            }
        }
        if (type == 'open' || type == 'stop') {
            var val = type == 'open' ? 1 : 0;
            var result = await BindShopModel.update({ "_id": id }, { "status": val });
            return ctx.body = {
                status: 1,
                message: '操作成功',
                data: []
            }
        }
    } catch (err) {
        return ctx.body = {
            status: 10004,
            message: '操作失败',
            data: []
        }
    }
})

router.post('/account', async ctx => {
    const json = ctx.request.body;
    const userId = ctx.state.userInfo.userId;
    if (!json.level) {
        json.level = '0';
    }
    if (!json.is_real_name) {
        json.is_real_name = '0';
    }
    try {
        await bindAccountModel.insert({ ...json, userId: userId }).then(res => {
            if (json.platform_type == 0) {
                userInfoModel.update({ userId: userId }, { "$inc": { "account.tb": 1 } })
            } else {
                userInfoModel.update({ userId: userId }, { "$inc": { "account.jd": 1 } })
            }
        });
        return ctx.body = {
            status: 1,
            message: '绑定买号成功'
        }
    } catch (e) {
        return ctx.body = {
            status: 0,
            message: '绑定买号失败'
        }
    }

})

router.post('/account/:opera/:id', async ctx => {
    const { opera, id } = ctx.params;
    if (opera == 'update') {
        return ctx.body = {
            status: 1,
            message: '买号更新成功'
        }
    } else if (opera == 'delete') {
        try {
            await bindAccountModel.remove({ _id: tools.getObjectId(id) });
            return ctx.body = {
                status: 1,
                message: '买号删除成功'
            }
        } catch (e) {
            return ctx.body = {
                status: 0,
                message: '买号删除失败'
            }
        }
    }
})


module.exports = router.routes();