
var router = require('koa-router')();
//引入模块

var login = require('./admin/login.js');
var user = require('./admin/user.js');
var url = require('url');

const tools = require('../util/tools');

// app.all("*", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-control-Allow-Headers", "xCors");    //允许请求头中携带 xCors
//     next();
// })

//配置中间件 获取url的地址
router.use(async (ctx, next) => {
    //console.log(ctx.request.header.host);
    //模板引擎配置全局的变量
    ctx.state.__HOST__ = 'http://' + ctx.request.header.host;
    console.log(ctx.request.url);  //   /admin/user
    //  /admin/login/code?t=709.0399997523431
    var pathname = url.parse(ctx.request.url).pathname;
    //权限判断
    // let token = ctx.headers.authorization;
    let token = ctx.cookies.get('token');
    const verifyResult = tools.verifyToken(token);
    console.log(verifyResult);
    // if (token) {
    //     jwt.verify(token, 'secret', (err, decoded) => {
    //         if (err) {
    //             switch (err.name) {
    //                 case 'JsonWebTokenError':
    //                     res.status(403).send({ code: -1, msg: '无效的token' });
    //                     break;
    //                 case 'TokenExpiredError':
    //                     res.status(403).send({ code: -1, msg: 'token过期' });
    //                     break;
    //             }
    //         }
    //     })
    // }

    if (verifyResult) {
        ctx.state.userInfo = verifyResult;
        await next();
    } else {  //没有登录跳转到登录页面
        if (pathname == '/admin/login' || pathname == '/admin/login/doLogin' || pathname == '/admin/login/code') {
            await next();
        } else {
            ctx.redirect('/admin/login');
        }
    }

    if (ctx.status == '404') {
        console.log('endendend')
    }

})

router.get('/', async (ctx) => {
    ctx.render('admin/index');
})

router.use('/login', login);
router.use('/user', user);




module.exports = router.routes();