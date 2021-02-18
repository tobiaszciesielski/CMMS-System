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

const findOrCreate = async (location) => {
  const result = await StoringLocations.findOrCreate({where:{"storingLocationName": location}})
  return result[0].dataValues
}

module.exports = {
  findAll,
  findById,
  create,
  findOrCreate,
}