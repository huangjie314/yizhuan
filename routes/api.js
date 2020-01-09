
var router = require('koa-router')();
var querystring = require('querystring');
const tools = require('../model/tools');
const user = require('./api/user');

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

router.use('/user', user);


module.exports = router.routes();