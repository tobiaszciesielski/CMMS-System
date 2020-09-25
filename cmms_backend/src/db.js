const sql = require("mssql");
const config = require("./config");

const poolPromise = new sql.ConnectionPool(config.sql)
  .connect()
  .then((pool) => {
    console.log(`Connected to SQL Server: ${config.sql.server}`);
    return pool;
  })
  .catch((err) => console.log("SQL Server Connection Failed: ", err.message));

module.exports = {
  sql,
  poolPromise,
};
