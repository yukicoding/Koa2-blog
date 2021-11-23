/**
 * @description JSon schema 校验
 */

const Ajv = require('ajv')

const ajv = new Ajv()

/**
 *
 * @param {Object} schema
 * @param {Object} data
 */
function validate(schema, data = {}) {
  const vaild = ajv.validate(schema, data)
  if (!vaild) {
    return ajv.errors[0]
  }
}

module.exports = validate
