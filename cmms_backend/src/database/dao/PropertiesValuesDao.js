const db = require("../db")

const {Properties, Values, PropertiesValues} = db.models

const findAllProperties = async () => {
  return await Producers.findAll()
}

const findAllValues = async () => {
  return await Values.findAll()
}

const findAllPropertiesValues = async () => {
  return await PropertiesValues.findAll()
}

const findOrCreate = async (producer) => {
  const result = await Producers.findOrCreate({where: producer})
  return result[0].dataValues
}

module.exports = {
  findAllProperties,
  findAllValues,
  findAllPropertiesValues,
  findOrCreate,
}