/**
 * @description 博客路由 view
 */

const router = require('koa-router')()
const { loginRedirect, loginCheck } = require('../../middlewares/loginChecks')

//首页

router.get('/', loginCheck, async (ctx, next) => {
  await ctx.render('index', {})
})

module.exports = router
