var DataTypes = require("sequelize").DataTypes;
var _categories = require("./Categories");
var _items = require("./Items");
var _producers = require("./Producers");
var _properties = require("./Properties");
var _propertiesValues = require("./PropertiesValues");
var _rentals = require("./Rentals");
var _roles = require("./Roles");
var _storingLocations = require("./StoringLocations");
var _subCategories = require("./SubCategories");
var _subSubCategories = require("./SubSubCategories");
var _users = require("./Users");
var _values = require("./Values");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var items = _items(sequelize, DataTypes);
  var producers = _producers(sequelize, DataTypes);
  var properties = _properties(sequelize, DataTypes);
  var propertiesValues = _propertiesValues(sequelize, DataTypes);
  var rentals = _rentals(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var storingLocations = _storingLocations(sequelize, DataTypes);
  var subCategories = _subCategories(sequelize, DataTypes);
  var subSubCategories = _subSubCategories(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var values = _values(sequelize, DataTypes);

  items.belongsTo(producers, { foreignKey: "producerId"});
  producers.hasMany(items, { foreignKey: "producerId"});
  items.belongsTo(storingLocations, { foreignKey: "storingLocationId"});
  storingLocations.hasMany(items, { foreignKey: "storingLocationId"});
  items.belongsTo(subSubCategories, { foreignKey: "subSubCategoryId"});
  subSubCategories.hasMany(items, { foreignKey: "subSubCategoryId"});
  propertiesValues.belongsTo(items, { foreignKey: "itemId"});
  items.hasMany(propertiesValues, { foreignKey: "itemId"});
  propertiesValues.belongsTo(properties, { foreignKey: "propertyId"});
  properties.hasMany(propertiesValues, { foreignKey: "propertyId"});
  propertiesValues.belongsTo(values, { foreignKey: "valueId"});
  values.hasMany(propertiesValues, { foreignKey: "valueId"});
  rentals.belongsTo(items, { foreignKey: "itemId"});
  items.hasMany(rentals, { foreignKey: "itemId"});
  rentals.belongsTo(users, { foreignKey: "userId"});
  users.hasMany(rentals, { foreignKey: "userId"});
  subCategories.belongsTo(categories, { foreignKey: "categoryId"});
  categories.hasMany(subCategories, { foreignKey: "categoryId"});
  subSubCategories.belongsTo(subCategories, { foreignKey: "subCategoryId"});
  subCategories.hasMany(subSubCategories, { foreignKey: "subCategoryId"});
  users.belongsTo(roles, { foreignKey: "roleId"});
  roles.hasMany(users, { foreignKey: "roleId"});

  return {
    categories,
    items,
    producers,
    properties,
    propertiesValues,
    rentals,
    roles,
    storingLocations,
    subCategories,
    subSubCategories,
    users,
    values,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
