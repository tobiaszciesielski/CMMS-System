/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Rentals.init(sequelize, DataTypes);
}

class Rentals extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    rentalId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'rental_id'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      field: 'user_id'
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
    rentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'rental_date'
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rentals',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_rentals",
        unique: true,
        fields: [
          { name: "rental_id" },
        ]
      },
    ]
  });
  return Rentals;
  }
}
