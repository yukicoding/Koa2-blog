/**
 * JSON schema 验证中间件
 */

//数据返回格式
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 生成json schema 验证的中间件
 * @param {funtion} validateFn 验证函数
 * @returns
 */
function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      //验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    //成功
    await next()
  }
  //Return 中间件
  return validator
}

module.exports = {
  genValidator,
}
