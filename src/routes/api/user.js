/**
 * @description User api 路由
 */

const router = require('koa-router')()
//校验
const userValidate = require('../../vaildator/user')
const { genValidator } = require('../../middlewares/vaildator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')
//controller
const {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout,
} = require('../../controller/user')

router.prefix('/api/user')

//删除路由
router.post('/detele', loginCheck, async (ctx, next) => {
  //测试环境下，测试账号登陆之后可以删除自己
  if (isTest) {
    const { userName } = ctx.session.userInfo

    //调用controller
    ctx.body = await deleteCurUser(userName)
  }
})

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

//修改个人信息
router.patch(
  '/changeInfo',
  genValidator(userValidate),
  loginCheck,
  async (ctx, next) => {
    console.log('in')
    const { nickName, city, picture } = ctx.request.body

    //调用controller
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
  }
)

//修改密码
router.patch(
  '/changePassword',
  genValidator(userValidate),
  loginCheck,
  async (ctx, next) => {
    console.log('in')
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    //调用controller
    ctx.body = await changePassword(userName, password, newPassword)
  }
)

//用户退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  //controller
  ctx.body = await logout(ctx)
})

module.exports = router
