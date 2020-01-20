
var router = require('koa-router')();
const tools = require('../../util/tools');

const DB = require('../../util/db');
const fs = require('fs');
const path = require('path');
const User = require('../../data/model/User');
const Counter = require('../../data/model/Counter');
const UserInfo = require('../../data/model/UserInfo');



// 用户注册
router.post('/register', async (ctx) => {
    const {
        platform_type,
        password,
        pay_password,
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
            // let result = await DB.find('user', { "mobile": mobile });
            let result = await User.getCountByConditions({ "mobile": mobile });
            if (result > 0) {
                return ctx.body = {
                    status: 10005,
                    message: "该手机号已被注册",
                    data: []
                }
            }
            if (p_name) {
                result = await User.getCountByConditions({ "mobile": p_name });
                if (result == 0) {
                    return ctx.body = {
                        status: 10003,
                        message: "推荐人账户不存在",
                        data: []
                    }
                }
            }
            const _id = await Counter.findByIdAndUpdate('userId');
            result = await User.insert({
                _id: _id,
                platform_type,
                password: tools.md5(password),
                pay_password: tools.md5(pay_password),
                qq,
                mobile,
                p_name,
                type
            });
            await UserInfo.insert({
                userId: _id,
                platform_type,
                qq,
                mobile,
                username: mobile,
                p_name,
                type
            }).catch(err => {
                return ctx.body = {
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
    // var result = await DB.find('user', { "mobile": username, "password": tools.md5(password) });
    var result = await User.find({ "mobile": username, "password": tools.md5(password) });
    if (result.length > 0) {
        var token = tools.signToken({ "mobile": username, "type": result[0].type, "_id": result[0]._id });
        ctx.session.userId = result[0]._id;
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

// 上传头像
router.post('/uploadAvatar', async (ctx) => {
    const { avatar } = ctx.request.body;
    var base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, 'base64');
    const filePath = '/default/avatar.png';
    try {
        fs.writeFileSync('upload' + filePath, dataBuffer);
        // const ret = await DB.update('userInfo', { userId: ctx.session.userId }, { avatar: filePath });
        const ret = await UserInfo.update({ userId: ctx.session.userId }, { avatar: filePath });
        return ctx.body = {
            status: 1,
            message: '上传成功',
            data: {
                avatar: filePath
            }
        }
    } catch (err) {
        return ctx.body = {
            status: 10004,
            message: '上传失败',
            data: {}
        }
    }
})

// 更新个人资料
router.post('/update', async (ctx) => {
    const json = ctx.request.body;
    try {
        // const ret = await DB.update('userInfo', { userId: ctx.session.userId }, json);
        const ret = await UserInfo.update({ userId: ctx.session.userId }, json);
        return ctx.body = {
            status: 1,
            message: '更新密码成功',
            data: {}
        }
    } catch (err) {
        return ctx.body = {
            status: 10004,
            message: '更新密码失败',
            data: {}
        }
    }
})

// 修改密码
router.post('/password', async (ctx) => {
    const { old_password, password } = ctx.request.body;
    // var result = await DB.find('user', { _id: ctx.session.userId }).catch(err => {
    // });
    var result = await User.find({ _id: ctx.session.userId }).catch(err => {
    });
    if (result[0].password != tools.md5(old_password)) {
        return ctx.body = {
            status: 10004,
            message: '用户密码不正确',
            data: {}
        }
    }

    try {
        // const ret = await DB.update('user', { _id: ctx.session.userId }, { password: tools.md5(password) });
        const ret = await User.update({ _id: ctx.session.userId }, { password: tools.md5(password) });
        ctx.cookies.set('token', ctx.cookies.get('token'), {
            maxAge: -1,
            httpOnly: true
        });
        return ctx.body = {
            status: 1,
            message: '更新密码成功',
            data: {}
        }
    } catch (err) {
        return ctx.body = {
            status: 10004,
            message: '更新密码失败',
            data: {}
        }
    }
})

// 忘记密码
router.post('/forget', async (ctx) => {
    const { mobile, password, code } = ctx.request.body;
    var result = await User.find({ mobile: mobile }).catch(err => {
    });
    if (result.length == 0) {
        return ctx.body = {
            status: 10004,
            message: '该用户名不存在，请前往注册',
            data: {}
        }
    }

    try {
        const ret = await User.update({ mobile: mobile }, { password: tools.md5(password) });
        ctx.cookies.set('token', ctx.cookies.get('token'), {
            maxAge: -1,
            httpOnly: true
        });
        return ctx.body = {
            status: 1,
            message: '重设密码成功',
            data: {}
        }
    } catch (err) {
        return ctx.body = {
            status: 10004,
            message: '重设密码失败',
            data: {}
        }
    }
})


// 修改支付密码
router.post('/updatePayPassword', async (ctx) => {
    const { old_pay_password, pay_password } = ctx.request.body;
    var result = await User.find({ _id: ctx.session.userId }).catch(err => {
    });
    if (result[0].password != tools.md5(old_pay_password)) {
        return ctx.body = {
            status: 10004,
            message: '支付密码不正确',
            data: {}
        }
    }

    try {
        const ret = await User.update({ _id: ctx.session.userId }, { pay_password: tools.md5(pay_password) });
        return ctx.body = {
            status: 1,
            message: '更新支付密码成功',
            data: {}
        }
    } catch (err) {
        return ctx.body = {
            status: 10004,
            message: '更新支付密码失败',
            data: {}
        }
    }
})

// 忘记支付密码
router.post('/forgetPayPassword', async (ctx) => {
    const { mobile, pay_password, code } = ctx.request.body;
    try {
        const ret = await User.update({ _id: ctx.session.userId }, { pay_password: tools.md5(pay_password) });
        return ctx.body = {
            status: 1,
            message: '重设支付密码成功',
            data: {}
        }
    } catch (err) {
        return ctx.body = {
            status: 10004,
            message: '重设支付密码失败',
            data: {}
        }
    }
})

// 绑定QQ
router.post('/uploadQQ', async (ctx) => {
    const { qq } = ctx.body.request;
    try {
        const ret = await UserInfo.update({ userId: ctx.session.userId }, { qq });
        return ctx.body = {
            status: 1,
            message: '更新QQ号成功',
            data: {}
        }
    } catch (err) {
        return ctx.body = {
            status: 10004,
            message: '更新QQ号失败',
            data: {}
        }
    }
})

router.post('/uploadMobile', async (ctx) => {
    const { mobile, code } = ctx.body.request;
    try {
        await UserInfo.update({ userId: ctx.session.userId }, { mobile });
        await User.update({ _id: ctx.session.userId }, { mobile });
        return ctx.body = {
            status: 1,
            message: '更新手机成功',
            data: {}
        }
    } catch (err) {
        return ctx.body = {
            status: 10004,
            message: '更新手机失败',
            data: {}
        }
    }
})



module.exports = router.routes();