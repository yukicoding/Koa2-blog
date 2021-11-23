/**
 * @description User api 路由
 */

const router = require('koa-router')()
//校验
const userValidate = require('../../vaildator/user')
const { genValidator } = require('../../middlewares/vaildator')
console.log(typeof genValidator)
//controller
const { isExist, register, login } = require('../../controller/user')

router.prefix('/api/user')

//登录路由
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  // controller
  ctx.body = await login(ctx, userName, password)
})

//注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
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
