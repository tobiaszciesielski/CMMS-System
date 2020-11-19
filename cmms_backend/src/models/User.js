const { poolPromise, sql } = require("../db");
const Joi = require("@hapi/joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../config")

const { RoleModel } = require("./Role")

const UserModel = {
  id: sql.Int,
  login: sql.NVarChar(50),
  password: sql.NVarChar(50),
  email: sql.NVarChar(50),
  firstName: sql.NVarChar(50),
  lastName: sql.NVarChar(50),
  lastSession: sql.DateTime,
  role: RoleModel,
};

const validateSchema = {
  id: Joi.number().min(0),
  login: Joi.string().max(UserModel.login.length).required(),
  password: Joi.string().max(UserModel.password.length).required(),
  email: Joi.string().max(UserModel.email.length).required().email(),
  firstName: Joi.string().max(UserModel.firstName.length).required(),
  lastName: Joi.string().max(UserModel.lastName.length).required(),
  lastSession: Joi.string(),
};

const validateUser = (userObject) => {
  const schema = Joi.object(validateSchema);
  const { error } = schema.validate(userObject);
  return error ? error.details[0].message : "";
};

const validateLogin = (loginData) => {
  const schema = Joi.object(_.pick(validateSchema, ["login", "password"]));
  const { error } = schema.validate(loginData);
  return error ? error.details[0].message : "";
};

const createAuthToken = (user) => {
  return jwt.sign(_.omit(user, "password"), config.jwtPrivateKey);
};

const findById = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request().input("id", sql.Int, id).query(`
        SELECT * FROM Users 
          WHERE
            id=@id
    `);
  const {
    recordset: [user],
  } = result;
  return user;
};

const findByLogin = async (login) => {
  const pool = await poolPromise;
  const result = await pool.request().input("login", UserModel.login, login)
    .query(`
        SELECT * FROM Users 
          WHERE
            login=@login
    `);
  const {
    recordset: [user],
  } = result;
  return user;
};

const create = async (userObject) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("login", UserModel.login, userObject.login)
    .input("password", UserModel.password, userObject.password)
    .input("email", UserModel.email, userObject.email)
    .input("firstName", UserModel.firstName, userObject.firstName)
    .input("lastName", UserModel.lastName, userObject.lastName)
    .input("role", UserModel.role, userObject.role).query(`
    INSERT INTO Users
      (login, password, email, firstName, lastName, role)
        VALUES
          (@login, @password, @email, @firstName, @lastName, @role)
    `);
};

const remove = async (id) => {
  const pool = await poolPromise;
  await pool.request().input("id", sql.Int, id).query(`
    DELETE FROM Users
      WHERE 
        id=@id
  `);
};

const update = async (userObject) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("login", UserModel.login, userObject.login)
    .input("password", UserModel.password, userObject.password)
    .input("email", UserModel.email, userObject.email)
    .input("firstName", UserModel.firstName, userObject.firstName)
    .input("lastName", UserModel.lastName, userObject.lastName)
    .input("role", UserModel.role, userObject.role)
    .input("id", sql.Int, userObject.id).query(`
    UPDATE Users
      SET
        login = @login, 
        password = @password,
        email = @email,
        firstName = @firstName,
        lastName = @lastName,
        role = @role
      WHERE
        id=@id
  `);
};

module.exports = {
  validateUser,
  validateLogin,
  createAuthToken,
  findByLogin,
  findById,
  create,
  remove,
  update,
};
