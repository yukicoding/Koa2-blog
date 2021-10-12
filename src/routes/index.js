const Router = require('koa-router')
const router = Router()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg:'你好啊',
    isMe:false,
    blogList:[
      {
        id:1,
        title:'aaa'
      },
      {
        id:2,
        title:'bbb'
      },
      {
        id:3,
        title:'cccc'
      },
      {
        id:4,
        title:'dddd'
      }
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/load/:username',async (ctx,next)=>{
  const {username} = ctx.params
  ctx.body = {
    title:'this is a username',
    username
  }
})

router.post('/load',async (ctx,next)=>{
  const {username,password} = ctx.request.body;
  ctx.body = {
    username,
    password
  }
})

module.exports = router
