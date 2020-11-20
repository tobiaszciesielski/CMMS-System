/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return subSubCategories.init(sequelize, DataTypes);
}

class subSubCategories extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    subSubCategoryId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'sub_sub_category_id'
    },
    subSubCategoryName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'sub_sub_category_name'
    },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sub_categories',
        key: 'sub_category_id'
      },
      field: 'sub_category_id'
    }
  }, {
    sequelize,
    tableName: 'sub_sub_categories',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_sub_sub_categories",
        unique: true,
        fields: [
          { name: "sub_sub_category_id" },
        ]
      },
    ]
  });
  return subSubCategories;
  }
}
