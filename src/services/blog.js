/**
 * @description 微博 service
 */

const Blog = require('../db/model/Blog')

/**
 *
 * @param {object} param0  创建微博所需参数{ userId, content, image }
 */
async function createBlog({ userId, content, image }) {
  console.log(userId)
  const result = await Blog.create({
    userId,
    content,
    image,
  })
  return result.dataValue
}

module.exports = {
  createBlog,
}
