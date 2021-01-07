const { Sequelize, DATE } = require("sequelize")
const { sql } = require("../config")
const { initModels } = require ("./models/init-models")

// node_modules\.bin\sequelize-auto -o ".\src\database\models\" -c ".\sql.json" -h "LAPTOP-O5V4J9HL" -d "Magazine_Module_DB" -u "tc" -x "1234" --caseModel p --caseProp c --caseFile p -l es6

// https://github.com/sequelize/sequelize/issues/7879#issuecomment-329971730
DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

const database = new Sequelize(sql);

// https://stackoverflow.com/a/53554207
;(async () => {
  await database.authenticate()
  .then(() => console.log("Connected with", database.getDialect(), ":", database.getDatabaseName()))
  .catch(err => console.log("DB:Error: " + err));
})();

initModels(database);

module.exports = database
