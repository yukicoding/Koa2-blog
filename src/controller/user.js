/**
 * @description user controller
 */

const { getUserInfo, createUser } = require('../services/user')
//返回格式
const { SuccessModel, ErrorModel } = require('../model/ResModel')
//信息错误格式
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
} = require('../model/ErrorInfo')

const { doCrypto } = require('../utils/cryp')

//业务逻辑处理
//调用services层获取数据
//统一返回格式

/**
 *
 * @param {Object} ctx
 * @param {String} userName
 * @param {String} password
 * @returns
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 *
 * @param {String} userName
 * @param {String} password
 * @param {Number} gender
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  } else {
    //service
    try {
      createUser({
        userName,
        password: doCrypto(password),
        gender,
      })
      return new SuccessModel()
    } catch (error) {
      console.log(error.message, error.stack)
      return new ErrorModel(registerFailInfo)
    }
  }
}

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
}

module.exports = {
  isExist,
  register,
  login,
}
