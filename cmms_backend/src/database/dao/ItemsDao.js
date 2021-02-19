const db = require('../db')

const {
  Items,
  SubSubCategories,
  StoringLocations,
  Producers,
  PropertiesValues,
  Properties,
  Values
} = db.models


const findAll = async () => {
  return await Items.findAll({include:[Producers, SubSubCategories, StoringLocations, {model: PropertiesValues, include: [Properties, Values]}]})
}

const findById = async (id) => {
  return await Items.findByPk(id)
}

const create = async (item) => {
  return await Items.create(item)
}

module.exports = {
  findAll,
  findById,
  create,
}