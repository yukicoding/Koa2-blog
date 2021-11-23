/**
 * @description user view 路由
 *
 */
const router = require('koa-router')()

/**
 * 获取登录信息
 * @param {Object} ctx
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false, //DEFAULT NO LOGIN
  }
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.name,
    }
  }
  return data
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router
