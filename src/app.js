const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')

//密匙
const { SECRET } = require('./conf/constants')

//env
const { isProd } = require('./utils/env')

//路由
const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redict: '/error',
  }
}
onerror(app, onerrorConf)

//每次请求中间件都会进行验证token
app.use(
  jwtKoa({
    secret: SECRET,
  }).unless({
    path: [/^\/users\/login$/], //自定义哪些目录忽略JWT验证
  })
)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
//json解析
app.use(json())
//使用日志
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
)
debugger
//session 配置
app.keys = ['UIsdf_7878#$']
app.use(
  session({
    key: 'weibo.sid', //session标识
    prefix: 'weibo:sess', //redis key 的前缀，默认是 koa:sess
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //one day
    },
    ttl: 24 * 60 * 60 * 1000, // redis one day
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
)

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), index.allowedMethods()) //404路由

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
