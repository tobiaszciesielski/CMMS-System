const db = require("../db")

const {Categories, SubCategories, SubSubCategories, Items, PropertiesValues, Rentals} = db.models

const getCategoriesTree = async () => {
  return Categories.findAll({
    attributes: [
      ["category_id", "id"], // categoryId as id
      ["category_name", "name"], // "category_name as name"
    ],
    include: [{
      model: SubCategories,
      attributes: [
        ["sub_category_id", "id"], // categoryId as id
        ["sub_category_name", "name"], // "category_name as name"
      ],
      include: [{
        attributes: [
          ["sub_sub_category_id", "id"], // categoryId as id
          ["sub_sub_category_name", "name"], // "category_name as name"
        ],
        model: SubSubCategories,
      }],
    }],
  }).then(res => {
    // used to keep nested data as array
    res = JSON.parse(JSON.stringify(res))

    // rename sub cat to chlidren
    for (let i = 0; i < res.length; i++) {
      res[i].children = res[i].SubCategories;
      
      // rename sub sub cat to chlidren
      for (let j = 0; j < res[i].children.length; j++) {
        res[i].children[j].children = res[i].children[j].SubSubCategories;
        delete res[i].children[j].SubSubCategories;
      }
      delete res[i].SubCategories;
    }
    return res
  })
} 

const setCategoriesTree = async (categoryTree) => {
  let categoryList = categoryTree.categoryList 
  for (let i = 0; i < categoryList.length; i++) {
    category = categoryList[i]
    await Categories.upsert({
      categoryId: category.id,
      categoryName: category.name,
    })
    for (let j = 0; j < category.children.length; j++) {
      subCategory = category.children[j]
      await SubCategories.upsert({
        subCategoryId: subCategory.id,
        subCategoryName: subCategory.name,
        categoryId: category.id,
      })
      for (let k = 0; k < subCategory.children.length; k++) {
        subSubCategory = subCategory.children[k]
        if(subSubCategory) {
          await SubSubCategories.upsert({
            subSubCategoryId: subSubCategory.id,
            subSubCategoryName: subSubCategory.name,
            subCategoryId: subCategory.id,
          })
        }
      }
    }
  }

  // await Rentals.destroy({where:{}})
  // await PropertiesValues.destroy({where:{}})
  // await Items.destroy({where:{}})
  // await SubSubCategories.destroy({where:{}})
  // await SubCategories.destroy({where:{}})
  // await Categories.destroy({where:{}})
}

module.exports = {
  setCategoriesTree,
  getCategoriesTree,
}
