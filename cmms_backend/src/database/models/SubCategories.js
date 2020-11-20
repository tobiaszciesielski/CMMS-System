/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return subCategories.init(sequelize, DataTypes);
}

class subCategories extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    subCategoryId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'sub_category_id'
    },
    subCategoryName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'sub_category_name'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'category_id'
      },
      field: 'category_id'
    }
  }, {
    sequelize,
    tableName: 'sub_categories',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_sub_categories",
        unique: true,
        fields: [
          { name: "sub_category_id" },
        ]
      },
    ]
  });
  return subCategories;
  }
}
