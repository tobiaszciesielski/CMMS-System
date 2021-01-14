const db = require('../db')

const {StoringLocations} = db.models

const findAll = async () => {
  return await StoringLocations.findAll()
}

const findById = async (id) => {
  return await StoringLocations.findByPk(id)
}

module.exports = {
  findAll,
  findById
}