const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const utils = require('util')
const verify = utils.promisify(jwt.verify)
const { SECRET } = require('../conf/constants')

router.prefix('/users')

router.get('/', function (ctx) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx) {
  ctx.body = 'this is a users/bar response'
})

//模拟登录
router.post('/login', async (ctx, next) => {
  let userInfo
  const { username, password } = ctx.request.body
  if (username === 'hyq' && password === '123') {
    userInfo = {
      userId: 1,
      userName: 'huangyongqi',
    }
  }

  //加密userinfo
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, {
      expiresIn: '1h',
    })
  }
  if (userInfo === null) {
    ctx.bdoy = {
      error: -1,
    }
    return
  }
  ctx.body = {
    error: 0,
    data: token,
  }
})

//获取用户信息

router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      error: 0,
      userInfo: payload,
    }
  } catch (error) {
    ctx.body = {
      error: 0,
      msg: 'error',
    }
  }
})

module.exports = router
