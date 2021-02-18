const db = require('../db')

const {Producers} = db.models

const findAll = async () => {
  return await Producers.findAll()
}

const findById = async (id) => {
  return await Producers.findByPk(id)
}

const create = async (producer) => {
  await Producers.create(producer)
}

const findOrCreate = async (producer) => {
  const result = await Producers.findOrCreate({where: producer})
  return result[0].dataValues
}

module.exports = {
  findAll,
  findById,
  create,
  findOrCreate,
}