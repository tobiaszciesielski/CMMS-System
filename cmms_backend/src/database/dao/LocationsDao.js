const db = require('../db')

const {StoringLocations} = db.models

const findAll = async () => {
  return await StoringLocations.findAll()
}

const findById = async (id) => {
  return await StoringLocations.findByPk(id)
}

const create = async (location) => {
  await StoringLocations.create(location)
}

module.exports = {
  findAll,
  findById,
  create,
}