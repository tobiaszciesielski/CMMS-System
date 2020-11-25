var DataTypes = require("sequelize").DataTypes;
var _Categories = require("./categories");
var _Items = require("./items");
var _Producers = require("./producers");
var _Properties = require("./properties");
var _PropertiesValues = require("./propertiesValues");
var _Rentals = require("./rentals");
var _Roles = require("./roles");
var _StoringLocations = require("./storingLocations");
var _SubCategories = require("./subCategories");
var _SubSubCategories = require("./subSubCategories");
var _Users = require("./users");
var _Values = require("./values");

function initModels(sequelize) {
  var Categories = _Categories(sequelize, DataTypes);
  var Items = _Items(sequelize, DataTypes);
  var Producers = _Producers(sequelize, DataTypes);
  var Properties = _Properties(sequelize, DataTypes);
  var PropertiesValues = _PropertiesValues(sequelize, DataTypes);
  var Rentals = _Rentals(sequelize, DataTypes);
  var Roles = _Roles(sequelize, DataTypes);
  var StoringLocations = _StoringLocations(sequelize, DataTypes);
  var SubCategories = _SubCategories(sequelize, DataTypes);
  var SubSubCategories = _SubSubCategories(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var Values = _Values(sequelize, DataTypes);

  Items.belongsTo(Producers, { foreignKey: "producerId"});
  Producers.hasMany(Items, { foreignKey: "producerId"});
  Items.belongsTo(StoringLocations, { foreignKey: "storingLocationId"});
  StoringLocations.hasMany(Items, { foreignKey: "storingLocationId"});
  Items.belongsTo(SubSubCategories, { foreignKey: "subSubCategoryId"});
  SubSubCategories.hasMany(Items, { foreignKey: "subSubCategoryId"});
  PropertiesValues.belongsTo(Items, { foreignKey: "itemId"});
  Items.hasMany(PropertiesValues, { foreignKey: "itemId"});
  PropertiesValues.belongsTo(Properties, { foreignKey: "propertyId"});
  Properties.hasMany(PropertiesValues, { foreignKey: "propertyId"});
  PropertiesValues.belongsTo(Values, { foreignKey: "valueId"});
  Values.hasMany(PropertiesValues, { foreignKey: "valueId"});
  Rentals.belongsTo(Items, { foreignKey: "itemId"});
  Items.hasMany(Rentals, { foreignKey: "itemId"});
  Rentals.belongsTo(Users, { foreignKey: "userId"});
  Users.hasMany(Rentals, { foreignKey: "userId"});
  SubCategories.belongsTo(Categories, { foreignKey: "categoryId"});
  Categories.hasMany(SubCategories, { foreignKey: "categoryId"});
  SubSubCategories.belongsTo(SubCategories, { foreignKey: "subCategoryId"});
  SubCategories.hasMany(SubSubCategories, { foreignKey: "subCategoryId"});
  Users.belongsTo(Roles, { foreignKey: "roleId"});
  Roles.hasMany(Users, { foreignKey: "roleId"});

  return {
    Categories,
    Items,
    Producers,
    Properties,
    PropertiesValues,
    Rentals,
    Roles,
    StoringLocations,
    SubCategories,
    SubSubCategories,
    Users,
    Values,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
