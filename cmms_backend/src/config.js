const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  NODE_ENV,
  PORT,
  JWT_PRIVATE_KEY,
  SQL_PASSWORD,
  SQL_DATABASE,
  SQL_SERVER,
  SQL_USER,
} = process.env;

const sqlEncript = process.env.SQL_ENCRYPT === "true";
const sqlArithAbort = process.env.SQL_ENABLE_ARITH_ABORT === "true";

assert(PORT, "PORT is required");
assert(JWT_PRIVATE_KEY, "JWT_PRIVATE_KEY is required");

module.exports = {
  port: PORT,
  jwtPrivateKey: JWT_PRIVATE_KEY,
  sql: {
    dialect: "mssql",
    timezone: "+01:00",
    host: SQL_SERVER,
    database: SQL_DATABASE,
    password: SQL_PASSWORD,
    username: SQL_USER,
    dialectOptions: {
      options: {
      validateBulkLoadParameters: true
      }
    },
    options: {
      encrypt: sqlEncript,
      enableArithAbort: sqlArithAbort,
    },
    logging: NODE_ENV === 'development' ? true : false
  },
};

console.log("Configured properly");
