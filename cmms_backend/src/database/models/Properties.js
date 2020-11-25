/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Properties.init(sequelize, DataTypes);
}

class Properties extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    propertyId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'property_id'
    },
    propertyName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'property_name'
    }
  }, {
    sequelize,
    tableName: 'properties',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_properties",
        unique: true,
        fields: [
          { name: "property_id" },
        ]
      },
    ]
  });
  return Properties;
  }
}
