/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constants')

/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 * @returns
 */
function _formatUserPicture(obj) {
  if (obj.picture === null) {
    obj.picture = DEFAULT_PICTURE
  }
  console.log(obj)
  return obj
}
/**
 *
 * @param {Array|Object} list  用户列表或者是单个用户对象
 */
function formatUser(list) {
  if (list === null) return
  if (list instanceof Array) {
    //数组
    //每个item都会执行 --->_formatUserPicture
    return list.map(_formatUserPicture)
  }
  //单个对象
  return _formatUserPicture(list)
}
module.exports = {
  formatUser,
}
