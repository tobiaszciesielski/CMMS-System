const { poolPromise, sql } = require("../db");
const Joi = require("@hapi/joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../config")

const Role = require("./Role");

const UserModel = {
  id: {
    colName: "user_id",
    sqlType: sql.Int,    
  },
  login: {
    colName: "login",
    sqlType: sql.NVarChar(50),    
  },
  password: {
    colName: "password",
    sqlType: sql.NVarChar(50),    
  },
  email: {
    colName: "email",
    sqlType: sql.NVarChar(50),    
  },
  firstName: {
    colName: "first_name",
    sqlType: sql.NVarChar(50),    
  },
  lastName: {
    colName: "last_name",
    sqlType: sql.NVarChar(50),    
  },
  role: Role.RoleModel,
  lastSession: {
    colName: "last_session",
    sqlType: sql.DateTime,    
  },
};

const UserKeys = Object.keys(UserModel) ;

const validateSchema = {
  id: Joi.number().min(0),
  login: Joi.string().max(UserModel.login.sqlType.length).required(),
  password: Joi.string().max(UserModel.password.sqlType.length).required(),
  email: Joi.string().max(UserModel.email.sqlType.length).required().email(),
  firstName: Joi.string().max(UserModel.firstName.sqlType.length).required(),
  lastName: Joi.string().max(UserModel.lastName.sqlType.length).required(),
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

const findById = async (userId) => {
  const {id, login, password, email, firstName, lastName, role, lastSession} = UserModel;
  const idParam = "id"
  console.log(id, login, password, email, firstName, lastName, role, lastSession)
  const pool = await poolPromise;
  const result = await pool.request().input(idParam, id.sqlType, userId).query(`
    SELECT 
      ${id.colName} as [${UserKeys[0]}], 
      ${login.colName} as [${UserKeys[1]}], 
      ${password.colName} as [${UserKeys[2]}], 
      ${email.colName} as [${UserKeys[3]}], 
      ${firstName.colName} as [${UserKeys[4]}], 
      ${lastName.colName} as [${UserKeys[5]}], 
      ${role.id.colName} as [${UserKeys[6]}], 
      ${lastSession.colName} as [${UserKeys[7]}]
    FROM users 
    WHERE ${id.colName}=@${idParam}
    `);
  const {
    recordset: [user],
  } = result;
  console.log(result)
  const r = await Role.getById(user.role, pool)
  pool.close();
  user.role = r
  return user;
};

const findByLogin = async (userLogin) => {
  const {id, login, password, email, firstName, lastName, role, lastSession} = UserModel;
  const loginParam = "login"

  const pool = await poolPromise;
  const result = await pool.request().input(loginParam, login.sqlType, userLogin).query(`
    SELECT 
      ${id.colName} as [${UserKeys[0]}], 
      ${login.colName} as [${UserKeys[1]}], 
      ${password.colName} as [${UserKeys[2]}], 
      ${email.colName} as [${UserKeys[3]}], 
      ${firstName.colName} as [${UserKeys[4]}], 
      ${lastName.colName} as [${UserKeys[5]}], 
      ${role.id.colName} as [${UserKeys[6]}], 
      ${lastSession.colName} as [${UserKeys[7]}]
    FROM users 
    WHERE ${login.colName}=@${loginParam}
    `);
  const {
    recordset: [user],
  } = result;
  const r = await Role.getById(user.role, pool)
  pool.close()
  user.role = r
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
