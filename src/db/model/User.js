/**
 * @description 用户数据模型
 */

//引入seq实例里面包含了各种配置信息

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

//params 1 table name 2 options
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名,only',
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码',
  },
  nickName: {
    type: STRING,
    allowNull: false,
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别(1男性，2女性，3保密）',
  },
  picture: {
    type: STRING,
    comment: '用户头像 url',
  },
  city: {
    type: STRING,
    comment: '城市',
  },
})
module.exports = User
