/**
 * @description user model test
 */

const User = require('../../src/db/model/User')

test('User 模型的各个属性，符合预期', () => {
  //build会构建一个在内存中的用户实例，但不会放入数据库中
  const user = User.build({
    userName: 'zhangsan',
    password: '123456',
    nickName: '张三',
    // gender:
    picture: '/xxx.png',
    city: '上海',
  })
  //验证属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('123456')
  expect(user.nickName).toBe('张三')
  expect(user.gender).toBe(3)
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('上海')
})
