/**
 * @description utils api 路由
 */

const { loginCheck } = require('../../middlewares/loginChecks')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')
const router = require('koa-router')()

router.prefix('/api/utils')

router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  if (!file) {
    return
  }
  const { size, path, name, type } = file
  //controller
  ctx.body = await saveFile({ size, filePath: path, name, type })
})

module.exports = router
