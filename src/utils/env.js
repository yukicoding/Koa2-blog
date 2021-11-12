/**
 * @Description 环境遍历
 *
 */

const ENV = process.env.NODE_ENV
console.log(ENV)
module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production',
  isTest: ENV === 'test',
  notTest: ENV !== 'test',
}
