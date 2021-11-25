/**
 * @description user view 路由
 *
 */
const router = require('koa-router')()
const { loginRedict } = require('../../middlewares/loginChecks')
/**
 * 获取登录信息
 * @param {Object} ctx
 */

router.get('/login', async (ctx, next) => {
  await ctx.render('login')
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register')
})

router.get('/setting', loginRedict, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo)
})

// router.get('/setting', loginRedirect, async (ctx, next) => {
//   await ctx.render('setting', ctx.session.userInfo)
// })

module.exports = router
