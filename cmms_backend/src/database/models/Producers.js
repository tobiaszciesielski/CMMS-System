/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Producers.init(sequelize, DataTypes);
}

class Producers extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    producerId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'producer_id'
    },
    producerName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'producer_name'
    },
    producerCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'producer_code'
    }
  }, {
    sequelize,
    tableName: 'producers',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_producers",
        unique: true,
        fields: [
          { name: "producer_id" },
        ]
      },
    ]
  });
  return Producers;
  }
}
