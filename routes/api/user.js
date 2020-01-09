
var router = require('koa-router')();
const tools = require('../../model/tools.js');

const DB = require('../../model/db.js');


router.get('/', async (ctx) => {

    await ctx.render('admin/user/list');
})

// 用户注册
router.post('/register', async (ctx) => {
    const {
        platform_type,
        password,
        confirm_password,
        pay_password,
        confirm_pay_password,
        qq,
        mobile,
        code,
        p_name,
        type
    } = ctx.request.body
    let res = {
        status: 1,
        message: "用户注册成功",
        data: []
    }
    if (tools.verifySmsCode(code)) {
        try {
            let result = await DB.find('yizhuan', { "mobile": mobile });
            if (result.length > 0) {
                return ctx.body = {
                    status: 10005,
                    message: "该手机号已被注册",
                    data: []
                }
            }
            if (p_name) {
                result = await DB.find('yizhuan', { "mobile": p_name });
                if (result.length == 0) {
                    return ctx.body = {
                        status: 10003,
                        message: "推荐人账户不存在",
                        data: []
                    }
                }
            }
            result = await DB.insert('yizhuan', {
                platform_type,
                password: tools.md5(password),
                confirm_password: tools.md5(confirm_password),
                pay_password: tools.md5(pay_password),
                confirm_pay_password: tools.md5(confirm_pay_password),
                qq,
                mobile,
                p_name,
                type
            }).catch(err => {
                res = {
                    status: 10004, //用户注册失败
                    message: "用户注册失败",
                    data: []
                }
            });

        } catch (e) {

        }
        return ctx.body = res;
    } else {

    }
})

// 用户登录
router.post('/login', async (ctx) => {

    let username = ctx.request.body.username;

    let password = ctx.request.body.password;

    var result = await DB.find('yizhuan', { "mobile": username, "password": tools.md5(password) });
    if (result.length > 0) {
        var token = tools.signToken({ "mobile": username, "password": tools.md5(password), "type": result[0].type });
        ctx.cookies.set('token', token, {
            maxAge: 60 * 1000 * 60,
            httpOnly: true
        });
        return ctx.body = {
            "status": 1,
            "message": "登录成功",
            "data": {
                "token": token,
                "url": '/'
            }
        }
    } else {
        return ctx.body = {
            "status": 10002,
            "message": "用户名或者密码错误",
            "data": {}
        }
    }

})

// 用户退出
router.post('/logout', async (ctx) => {
    ctx.cookies.set('token', ctx.cookies.get('token'), {
        maxAge: -1,
        httpOnly: true
    });
    return ctx.body = {
        status: 1,
        message: '退出成功',
        data: {}
    }
})

router.get('/edit', async (ctx) => {

    ctx.body = "编辑用户";

})

router.get('/delete', async (ctx) => {

    ctx.body = "删除用户";

})

module.exports = router.routes();