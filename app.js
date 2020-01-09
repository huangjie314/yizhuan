var Koa = require('koa')
  , logger = require('koa-logger')
  , json = require('koa-json')
  , onerror = require('koa-onerror');

var path = require('path'),
  router = require('koa-router')(),
  render = require('koa-art-template'),
  static = require('koa-static'),
  session = require('koa-session'),
  bodyParser = require('koa-bodyparser'),
  koaJwt = require('koa-jwt'), // 用于路由权限控制
  config = require('./model/config');


var app = new Koa();

// error handler
onerror(app);

//配置post提交数据的中间件
app.use(bodyParser());

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

// 路由权限控制
app.use(koaJwt({ secret: config.secret }).unless({
  // 设置login、register接口，可以不需要认证访问
  path: [
    /^\/api\/login/,
    /^\/api\/register/,
    /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
  ]
}))

//配置session的中间件

app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess',
  maxAge: 864000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,   /*每次请求都重新设置session*/
  renew: false,
};
app.use(session(CONFIG, app));

//配置模板引擎
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

//配置 静态资源的中间件
app.use(static(__dirname + '/public'));

app.use(json());
// app.use(logger());


//引入模块
var index = require('./routes/index.js');
var api = require('./routes/api.js');
var admin = require('./routes/admin.js');

router.use('/admin', admin);
router.use('/api', api);
router.use(index);


// routes definition
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
