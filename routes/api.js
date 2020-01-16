
var router = require('koa-router')();
var querystring = require('querystring');
const tools = require('../util/tools');

const fs = require('fs');

const user = require('./api/user');
const rechange = require('./api/recharge');
const auth = require('./api/auth');


//配置中间件 获取url的地址
router.use(async (ctx, next) => {
    //权限判断
    // let token = ctx.headers.authorization;
    let token = ctx.cookies.get('token');
    verifyResult = tools.verifyToken(token);

    if (verifyResult) {
        await next();
    } else {
        if (/\/login/.test(ctx.request.url)) {
            await next();
        } else {
            //无权限
            console.log('无权限');
        }

    }
})


router.get('/', async (ctx) => {

    ctx.render('test');

})

// 短信验证码
router.post("/sendCode", async (ctx) => {
    let random_code = (('000000' + Math.floor(Math.random() * 999999)).slice(-6));//随机码6位
    var queryData = querystring.stringify({
        "mobile": ctx.request.body.mobile,
        "tpl_id": 198938,
        "tpl_value": `#code#=${random_code}`,
        "key": '7e4c898fa91f854a0ac4e2aec6de604f',
    });

    const queryUrl = 'http://v.juhe.cn/sms/send?' + queryData;

    // const response = await tools.request({ queryUrl });
    ctx.body = {
        "status": 1,
        "message": "发送成功",
        "data": {
            // code: 123456
        }
    };
});

// 上传图片
router.post('/tools/uploadImage', async (ctx) => {
    const { image } = ctx.request.body;
    var base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, 'base64');
    var curTime = new Date().toLocaleDateString().replace(/-/g, '');
    var filePath = await new Promise((resolve, reject) => {
        fs.stat('upload/' + curTime, function (err, stats) {
            if (err) {  /*没有这个目录*/
                fs.mkdirSync('upload/' + curTime);
            }
            resolve('/' + curTime + '/' + tools.getObjectId().toString() + '.png');
        })
    }).catch(err => { })
    try {
        fs.writeFileSync('upload' + filePath, dataBuffer);
        return ctx.body = {
            status: 1,
            message: '图片上传成功',
            data: {
                image: filePath
            }
        }
    } catch (err) {
        return ctx.body = {
            status: 10004,
            message: '图片上传失败',
            data: {}
        }
    }

})


router.use('/user', user);
router.use('/recharge', rechange);


module.exports = router.routes();