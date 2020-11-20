/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return roles.init(sequelize, DataTypes);
}

class roles extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    roleId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'role_id'
    },
    roleName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'role_name'
    }
  }, {
    sequelize,
    tableName: 'roles',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_roles",
        unique: true,
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
  return roles;
  }
}
