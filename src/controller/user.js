/**
 * @description user controller
 */

const { getUserInfo } = require('../services/user')
//返回格式
const { SuccessModel, ErrorModel } = require('../model/ResModel')
//信息错误格式
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param {String} userName  用户名
 */

async function isExist(userName) {
  //call services
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    //已存在
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
    //不存在
  }
  //业务逻辑处理
  //调用services层获取数据
  //统一返回格式
}

module.exports = {
  isExist,
}
