/**
 * @description json test
 */

const server = require('./server')

test('json 接口返回数据格式正确', async () => {
  const response = await server.get('/json')
  expect(response.body).toEqual({
    title: 'koa2 json',
  })
  expect(response.body.title).toBe('koa2 json')
})
