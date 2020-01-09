
const router = require('koa-router')();

const tools = require('../../model/tools.js');

const DB = require('../../model/db.js');


router.get('/login', async (ctx) => {
    await ctx.render('default/login', {
        title: '登录'
    });
})

//post
router.post('/doLogin', async (ctx) => {

    //首先得去数据库匹配

    let username = ctx.request.body.username;

    let password = ctx.request.body.password;

    let code = ctx.request.body.code;


    //1、验证用户名密码是否合法

    //2、去数据库匹配

    //3、成功以后把用户信息写入sessoin

    if (code.toLocaleLowerCase() == ctx.session.code.toLocaleLowerCase()) {

        //后台也要验证码用户名密码是否合法

        var result = await DB.find('admin', { "username": username, "password": tools.md5(password) });

        if (result.length > 0) {


            var token = tools.signToken({ username, password });
            // ctx.session.userinfo = result[0];
            ctx.cookies.set('token', token, {
                maxAge: 60 * 1000 * 60,
                httpOnly: true
            });
            ctx.redirect(ctx.state.__HOST__ + '/admin');
        } else {
            //console.log('失败');
            ctx.render('admin/error', {
                message: '用户名或者密码错误',
                redirect: ctx.state.__HOST__ + '/admin/login'
            })

        }
    } else {
        ctx.render('admin/error', {
            message: '验证码失败',
            redirect: ctx.state.__HOST__ + '/admin/login'
        })
    }

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