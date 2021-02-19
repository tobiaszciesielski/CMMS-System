const db = require('../db')

const { Producers } = db.models

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
  const found = await Producers.findOne({where: {"producerName": producer.producerName}})
  let result;
  if (found) {
    producer.producerId = found.producerId
    result = await Producers.upsert(producer)
    return result[0].dataValues
  } else {
    result = await Producers.create(producer)
    return result
  }
}

module.exports = {
  findAll,
  findById,
  create,
  findOrCreate,
}