/**
 * @description utils controller
 */
const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')

const { uploadFileSizeFailInfo } = require('../model/ResModel')
const fse = require('fs-extra')

const MAX_SIZE = 1024 * 1024 * 1024 //最大体积为1M

//文件存储地址，拿到后需要再次移动
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then((exist) => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 *
 * @param {string} name
 * @param {string} type
 * @param {number} size
 * @param {string} filePath
 * @returns
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  //移动文件
  const fileName = Date.now() + '.' + name //防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName) //存储的目的地
  await fse.move(filePath, distFilePath)

  //返回信息
  return new SuccessModel({
    url: '/' + fileName,
  })
}

module.exports = {
  saveFile,
}
