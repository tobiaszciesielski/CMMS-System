const db = require("../db")

const {Categories, SubCategories, SubSubCategories} = db.models

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

const setCategoriesTree = async (categoryTree, nodesToDelete) => { 
 
  if (nodesToDelete.length > 0) {
      let previousTree = await getCategoriesTree()
      for (let i = 0; i < previousTree.length; i++) {
        category = previousTree[i]
        if (nodesToDelete.includes(category.id)) {
          await Categories.destroy({where: {categoryId: category.id}})
        }
        for (let j = 0; j < category.children.length; j++) {
        subCategory = category.children[j]
        if (nodesToDelete.includes(subCategory.id)) {
          await SubCategories.destroy({where: {subCategoryId: subCategory.id}})
        }
        for (let k = 0; k < subCategory.children.length; k++) {
          subSubCategory = subCategory.children[k]
          if(subSubCategory) {
            if (nodesToDelete.includes(subSubCategory.id)) {
              await SubSubCategories.destroy({where: {subSubCategoryId: subSubCategory.id}})
            } 
          }
        }
      }
    }
  }

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
}

module.exports = {
  setCategoriesTree,
  getCategoriesTree,
}
