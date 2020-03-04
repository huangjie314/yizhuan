/**
 * Created by Administrator on 2018/3/20 0020.
 */
const router = require('koa-router')();
const tool = require('../../util/tools');

const userModel = require('../../data/model/User');
const rechangeModel = require('../../data/model/Recharge');
const userInfoModel = require('../../data/model/UserInfo');
const captalModel = require('../../data/model/CaptalConfig');
const cashListModel = require('../../data/model/CashList');
const bindAccountModel = require('../../data/model/BindAccount');

router.get('/', async (ctx) => {

    await ctx.render('admin/user/list');
})


router.get('/add', async (ctx) => {

    await ctx.render('admin/user/add');

})

router.get('/edit', async (ctx) => {

    ctx.body = "编辑用户";

})

router.get('/delete', async (ctx) => {

    const { _id, type } = ctx.query;
    console.log('_id', _id);

    try {
        const ret = await userModel.remove({ _id });
        ctx.redirect(ctx.state.__HOST__ + '/admin/user' + type);
    } catch (e) {
        ctx.render('admin/error', {
            message: '删除失败',
            redirect: ctx.state.__HOST__ + '/admin/user' + type
        })
    }


    ctx.body = "删除用户";

})

router.get('/buyer', async (ctx) => {
    const users = await userModel.find({ type: 0 });
    await ctx.render('admin/user/buyer', {
        list: users
    });
})

router.get('/seller', async (ctx) => {
    const users = await userModel.find({ type: 1 });
    await ctx.render('admin/user/seller', {
        list: users
    });
})

router.get('/chongzhi', async (ctx) => {
    const rechange = await rechangeModel.find();
    await ctx.render('admin/chongzhi/list', {
        list: rechange
    })
})

router.get('/chongzhi/:opera/:userId/:_id/:money', async (ctx) => {
    const { opera, userId, _id, money } = ctx.params;
    let status;
    if (opera === 'pay') {
        // 打款
        status = 1;
    } else {
        // 驳回
        status = 2;
    }
    try {
        const res = await rechangeModel.update({ _id: tool.getObjectId(_id) }, { status: status }).then(res => {
            if (status === 1) {
                userInfoModel.update({ userId: userId }, { "$inc": { "money": money } })
            }
        });
        ctx.redirect(ctx.state.__HOST__ + '/admin/user/chongzhi');
    } catch (err) {
        ctx.render('admin/error', {
            message: '操作失败',
            redirect: ctx.state.__HOST__ + '/admin/user/chongzhi'
        })
    }
})

router.get('/chongzhi/captal', async (ctx) => {
    const captal = await captalModel.find();
    await ctx.render('admin/chongzhi/captal', {
        item: captal.length ? captal[0] : {}
    })
})

router.post('/chongzhi/captal/config', async ctx => {
    const json = ctx.request.body;
    try {
        await captalModel.update({ capitalId: 1 }, json);
        ctx.redirect(ctx.state.__HOST__ + '/admin/user/chongzhi/captal');
    } catch (e) {
        ctx.render('admin/error', {
            message: '操作失败',
            redirect: ctx.state.__HOST__ + '/admin/user/chongzhi/captal'
        })
    }
})

router.get('/tixian', async (ctx) => {
    const cashList = await cashListModel.find();
    await ctx.render('admin/tixian/list', {
        list: cashList
    })
})

router.get('/tixian/:opera/:userId/:_id/:money', async (ctx) => {
    const { opera, userId, _id, money } = ctx.params;
    let status;
    if (opera === 'pay') {
        // 打款
        status = 1;
    } else {
        // 驳回
        status = 2;
    }
    try {
        const res = await cashListModel.update({ _id: tool.getObjectId(_id) }, { status: status }).then(res => {
            if (status === 2) {
                userInfoModel.update({ userId: userId }, { "$inc": { "money": money } })
            }
        });
        ctx.redirect(ctx.state.__HOST__ + '/admin/user/tixian');
    } catch (err) {
        ctx.render('admin/error', {
            message: '操作失败',
            redirect: ctx.state.__HOST__ + '/admin/user/tixian'
        })
    }
})

router.get('/account', async (ctx) => {
    const accountList = await bindAccountModel.find({}, null, { sort: { created_at: 'desc' } });
    await ctx.render('admin/account/list', {
        list: accountList
    })
})

router.get('/account/:opera/:userId/:_id/:platType', async (ctx) => {
    const { opera, userId, _id, platType } = ctx.params;
    const status = opera === 'pass' ? 1 : 2;
    try {
        await bindAccountModel.update({ _id: tool.getObjectId(_id) }, { status: status }).then(res => {
            if (status === 2) { // 不通过
                bindAccountModel.remove({ _id: tool.getObjectId(_id) });
                if (platType == 0) {
                    userInfoModel.update({ userId: userId }, { "$inc": { "account.tb": -1 } })
                } else {
                    userInfoModel.update({ userId: userId }, { "$inc": { "account.jd": -1 } })
                }
            }
        });
        ctx.redirect(ctx.state.__HOST__ + '/admin/user/account');
    } catch (err) {
        ctx.render('admin/error', {
            message: '操作失败',
            redirect: ctx.state.__HOST__ + '/admin/user/account'
        })
    }
})

module.exports = router.routes();