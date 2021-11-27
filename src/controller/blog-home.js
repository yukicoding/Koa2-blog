/**
 * @description 首页 controller
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { createBlog } = require('../services/blog')
//XSS攻击

const xss = require('xss')

/**
 * 
 * @param {*} param0 创建微博所需数据

 */
async function create({ userId, content, image }) {
  //service
  try {
    const blog = await createBlog({ userId, content: xss(content), image })
    return new SuccessModel(blog)
  } catch (error) {
    console.log(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create,
}
