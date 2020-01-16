// 认证API
var router = require('koa-router')();
const tools = require('../../util/tools');
const UserInfo = require('../../data/model/UserInfo')

router.post('/name', async ctx => {
    const { code, real_name, identity } = ctx.request.body;
    var queryData = querystring.stringify({
        "idcard": identity,
        "realname": real_name,
        "key": 'c8a3f98c166f303d9ccc82476e432471',
    });

    const queryUrl = 'http://op.juhe.cn/idcard/query?' + queryData;

    // const response = await tools.request({ queryUrl });
    if (response.error_code == 0 && response.result && response.result.res == 1) {
        await UserInfo.update({ userId: ctx.session.userId }, {
            real_name: realname,
            identity: idcard,
            real_name_authentication: 1
        })
        ctx.body = {
            "status": 1,
            "message": "认证成功",
            "data": {
                // code: 123456
            }
        }
    } else {
        ctx.body = {
            "status": 10004,
            "message": "认证失败",
            "data": {
                // code: 123456
            }
        };
    }

})


router.post('/bank', async ctx => {
    const { code, bank_name, bankcard } = ctx.request.body;
    var queryData = querystring.stringify({
        "realname": bank_name,
        "bankcard": bankcard,
        "idcard": '', //身份证
        "mobile": '', //手机号码
        "key": '99d5b574b587916d06ff6d1fdd0672d2',
    });

    const queryUrl = 'http://v.juhe.cn/verifybankcard4/query?' + queryData;

    // const response = await tools.request({ queryUrl });
    if (response.error_code == 0 && response.result && response.result.res == 1) {
        await UserInfo.update({ userId: ctx.session.userId }, {
            bankcard: bankcard,
            bank_authentication: 1
        })
        ctx.body = {
            "status": 1,
            "message": "认证成功",
            "data": {
            }
        }
    } else {
        ctx.body = {
            "status": 10004,
            "message": "认证失败",
            "data": {
            }
        };
    }
})

router.post('/video', async ctx => {
    return ctx.body = {
        status: 1,
        message: "创建认证请求成功",
        data: []
    }
})

module.exports = router.routes();