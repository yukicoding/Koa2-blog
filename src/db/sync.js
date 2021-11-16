/**
 * @description sequlize 同步代码
 *
 */
const seq = require('./seq')
require('./model')

//测试链接
seq
  .authenticate()
  .then(() => {
    console.log('yes')
  })
  .catch(() => {
    console.log('error')
  })

seq.sync({ force: true }).then(() => {
  console.log('sync okkk')
  process.exit()
})
