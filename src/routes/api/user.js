/**
 * @description User api 路由
 */

const router = require('koa-router')()

//controller
const { isExist, register } = require('../../controller/user')

router.prefix('/api/user')

//注册路由
router.post('/register', async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  // controller
  ctx.body = await register({ userName, password, gender })
})

//判断用户是否存在
router.post('/isExist', async (ctx, next) => {
  //调用controller
  //ctx.body = await xxx()
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

//

module.exports = router
