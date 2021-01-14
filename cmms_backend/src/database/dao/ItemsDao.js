const db = require('../db')

const {Items} = db.models

const findAll = async () => {
  return await Items.findAll()
}

const findById = async (id) => {
  return await Items.findByPk(id)
}

// ! TODO
// UnhandledPromiseRejectionWarning: SequelizeValidationError: notNull Violation: Items.subSubCategoryId cannot be null,
// notNull Violation: Items.inStock cannot be null

const create = async (item) => {
  console.log(item)
  await Items.create(item)
}

module.exports = {
  findAll,
  findById,
  create,
}