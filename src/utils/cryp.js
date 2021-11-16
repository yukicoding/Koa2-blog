/**
 * @description 加密方法
 */

const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

const crypto = require('crypto')

/**
 *
 * @param {String} content  明文password
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}
/**
 *
 * @param {String} content 明文
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = {
  doCrypto,
}
