const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
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
    server: SQL_SERVER,
    database: SQL_DATABASE,
    password: SQL_PASSWORD,
    user: SQL_USER,
    options: {
      encrypt: sqlEncript,
      enableArithAbort: sqlArithAbort,
    },
  },
};

console.log("Configured properly");
