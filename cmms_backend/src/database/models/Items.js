/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Items.init(sequelize, DataTypes);
}

class Items extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    itemId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'item_id'
    },
    itemName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'item_name'
    },
    serialNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'serial_number'
    },
    subSubCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sub_sub_categories',
        key: 'sub_sub_category_id'
      },
      field: 'sub_sub_category_id'
    },
    producerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'producers',
        key: 'producer_id'
      },
      field: 'producer_id'
    },
    inStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'in_stock'
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    destiny: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    storingLocationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'storing_locations',
        key: 'storing_location_id'
      },
      field: 'storing_location_id'
    }
  }, {
    sequelize,
    tableName: 'items',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_items",
        unique: true,
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });
  return Items;
  }
}
