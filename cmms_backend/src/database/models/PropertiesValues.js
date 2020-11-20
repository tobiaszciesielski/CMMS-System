/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return propertiesValues.init(sequelize, DataTypes);
}

class propertiesValues extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    propertiesValuesId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'properties_values_id'
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'items',
        key: 'item_id'
      },
      field: 'item_id'
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'properties',
        key: 'property_id'
      },
      field: 'property_id'
    },
    valueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'values',
        key: 'value_id'
      },
      field: 'value_id'
    }
  }, {
    sequelize,
    tableName: 'properties_values',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_properties_values",
        unique: true,
        fields: [
          { name: "properties_values_id" },
        ]
      },
    ]
  });
  return propertiesValues;
  }
}
