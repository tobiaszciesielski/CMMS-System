/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Categories.init(sequelize, DataTypes);
}

class Categories extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    categoryId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'category_id'
    },
    categoryName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'category_name'
    }
  }, {
    sequelize,
    tableName: 'categories',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_categories",
        unique: true,
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  return Categories;
  }
}
