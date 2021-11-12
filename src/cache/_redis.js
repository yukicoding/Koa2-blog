/**
 * @description 链接redis 的方法 get 和 set
 *
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', (err) => {
  console.error('redis error', err)
})

/**
 *
 * @param {String} key  键
 * @param {String} val  值
 * @param {Number} timeout    单位是s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

//get
/**
 *
 * @param {String} key
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return null
      }
      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get,
}
