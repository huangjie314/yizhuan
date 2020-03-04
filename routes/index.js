
/**
 * 前台路由
 */
const router = require('koa-router')();
const url = require('url');
const tools = require('../util/tools');
const buyer = require('./default/buyer');
const seller = require('./default/seller');


const login = require('./default/login');
const user = require('./default/user');
const userInfo = require('../data/model/UserInfo');
// const captial = require('../data/model/CaptalConfig');
// const re = require('../data/model/ReleaseConfig')
// const re = require('../data/model/BindConfig')


let verifyResult = null;
//配置中间件 获取url的地址
router.use(async (ctx, next) => {
    //模板引擎配置全局的变量
    ctx.state.__HOST__ = 'http://' + ctx.request.header.host;
    var pathname = url.parse(ctx.request.url).pathname;
    //权限判断
    // let token = ctx.headers.authorization;
    let token = ctx.cookies.get('token');
    verifyResult = tools.verifyToken(token);

    if (verifyResult) {
        const result = await userInfo.find({ userId: verifyResult._id });
        ctx.state.userInfo = result[0]._doc;
        await next();
    } else {  //没有登录跳转到登录页面
        const reg = /\/login|\/register|\/repassword/;
        if (reg.test(pathname)) {
            await next();
        } else {
            ctx.redirect('/login');
        }
    }
})


router.get('/', async (ctx) => {
    await ctx.render('default/user/center/index', {
        title: verifyResult.type == '0' ? '会员中心' : '商家中心',
    });
})

router.use(login);

router.use('/userCenter', user);



router.use('/buyer', buyer);
router.use('/seller', seller);



// router.use('/login', login);

module.exports = router.routes();