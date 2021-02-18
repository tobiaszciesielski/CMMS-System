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
  producer.producerId = await Producers.findOne({where: {"producerName": producer.producerName}})
  const result = await Producers.upsert(producer)
  return result[0].dataValues
}

module.exports = {
  findAll,
  findById,
  create,
  findOrCreate,
}