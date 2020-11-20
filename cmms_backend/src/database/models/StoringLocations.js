/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return storingLocations.init(sequelize, DataTypes);
}

class storingLocations extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    storingLocationId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'storing_location_id'
    },
    storingLocationName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'storing_location_name'
    }
  }, {
    sequelize,
    tableName: 'storing_locations',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_storing_locations",
        unique: true,
        fields: [
          { name: "storing_location_id" },
        ]
      },
    ]
  });
  return storingLocations;
  }
}
