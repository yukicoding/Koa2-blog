/**
 * @description 存储位置
 */

const { isProd } = require('../utlis/env')
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
}
let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'koa_weibo_db',
}

if (isProd) {
  //线上环境的redis 配置
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  }
  //线上环境的mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'koa_weibo_db',
  }
}
module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
