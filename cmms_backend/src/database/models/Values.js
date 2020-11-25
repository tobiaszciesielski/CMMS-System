/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Values.init(sequelize, DataTypes);
}

class Values extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    valueId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'value_id'
    },
    valueName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'value_name'
    }
  }, {
    sequelize,
    tableName: 'values',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_values",
        unique: true,
        fields: [
          { name: "value_id" },
        ]
      },
    ]
  });
  return Values;
  }
}
