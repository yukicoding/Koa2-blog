/**
 * @description User api 路由
 */

const router = require('koa-router')()

//controller
const { isExist } = require('../../controller/user')

router.prefix('/api/user')

//注册路由
router.post('/register', async (ctx, next) => {
  // if(ctx.body)
})

//判断用户是否存在
router.post('/isExist', async (ctx, next) => {
  //调用controller
  //ctx.body = await xxx()
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router
