/**
 * @description user Service
 *
 */

//user模型
const { User } = require('../db/model')
const { formatUser } = require('./_format')
/**
 *
 * @param {String} userName
 * @param {String} password
 */
async function getUserInfo(userName, password) {
  //一、数据处理
  //查询条件
  const whereOpt = {
    userName,
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  //查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt,
  })
  if (result === null) {
    //未找到
    return result
  }
  //二、 格式化处理
  const formatRes = formatUser(result.dataValues)
  return formatRes
}
/**
 *
 * @param {String} userName
 * @param {String} password
 * @param {String} nickname
 * @param {Number} gender
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  console.log(userName)
  const result = User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName,
  })
  return result.dataValues
}

module.exports = {
  getUserInfo,
  createUser,
}
