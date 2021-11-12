const Router = require('koa-router')
const router = Router()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: '你好啊',
    isMe: false,
    blogList: [
      {
        id: 1,
        title: 'aaa',
      },
      {
        id: 2,
        title: 'bbb',
      },
      {
        id: 3,
        title: 'cccc',
      },
      {
        id: 4,
        title: 'dddd',
      },
    ],
  })
})

router.get('/string', async (ctx) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  const session = ctx.session
  if (session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++
  console.log(session)
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum,
    age: session.hyq,
  }
})

router.get('/load/:username', async (ctx) => {
  const { username } = ctx.params
  ctx.body = {
    title: 'this is a username',
    username,
  }
})

router.post('/load', async (ctx) => {
  const { username, password } = ctx.request.body
  ctx.body = {
    username,
    password,
  }
})

module.exports = router
