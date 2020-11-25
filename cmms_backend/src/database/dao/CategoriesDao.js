const db = require("../db")
const categories = require("../models/categories")

const {Categories, SubCategories, SubSubCategories} = db.models

const getCategoriesTree = async () => {
  return Categories.findAll({
    include: {
      model: SubCategories,
      include: {
        model: SubSubCategories
      }
    }
  })
} 

module.exports = {
  getCategoriesTree
}
