const db = require('../db')

const {
  Items,
  Categories, 
  SubCategories, 
  SubSubCategories,
  StoringLocations,
  Producers
} = db.models


const findAll = async () => {
  return await Items.findAll({include:[Producers, SubSubCategories, StoringLocations]})
}

const findById = async (id) => {
  return await Items.findByPk(id)
}

const create = async (item) => {
  console.log(item)
  await Items.create(item)
}

module.exports = {
  findAll,
  findById,
  create,
}