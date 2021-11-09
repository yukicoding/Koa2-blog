/**
 * @description sequelize实例
 */

const Sequelize = require('sequelize')

const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utlis/env')

const { host, user, password, database } = MYSQL_CONF
const config = {
  host,
  dialect: 'mysql',
}

//测试环境不做打印，用于快速定位错误的日志
if (isTest) {
  config.logging = () => {}
}

//线下环境使用连接池
if (isProd) {
  config.pool = {
    max: 5, //连接池最大的链接数量
    min: 0,
    idel: 10000,
  }
}

const seq = new Sequelize(database, user, password, config)

module.exports = seq

seq
  .authenticate()
  .then(() => {
    console.log('yes')
  })
  .catch(() => {
    console.log('error')
  })
