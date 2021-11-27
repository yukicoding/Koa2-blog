/**
 * @description 判断是否登录 中间件
 */

const { loginCheckFailInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * API登录验证
 * @param {Object} ctx
 * @param {Function} next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    //已登录
    await next()
    return
  }
  //未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 *  页面登录验证
 * @param {Object} ctx
 * @param {Function} next
 */
async function loginRedict(ctx, next) {
  // console.log(ctx.session)
  if (ctx.session && ctx.session.userInfo) {
    //已登录
    await next()
    return
  }
  console.log('没有登录')
  //未登录
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedict,
}
