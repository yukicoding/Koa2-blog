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
} = require('../model/ErrorInfo')

const { doCrypto } = require('../utils/cryp')

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

module.exports = {
  isExist,
  register,
}
