const { poolPromise, sql } = require("../db");

const RoleModel = {
  id: {
    colName: 'role_id',
    sqlType: sql.NVarChar(50),
  },
  role: {
    colName: 'role_name',
    sqlType: sql.NVarChar(50),
  },
};

const RoleKeys = Object.keys(RoleModel) ;

const getAllRoles = async () => {
  const pool = await poolPromise;
  const result = await pool.request()
    .query(`
      SELECT 
        ${RoleModel.id.colName} as [${RoleKeys[0]}], 
        ${RoleModel.role.colName} as [${RoleKeys[1]}]
      FROM roles
    `);

  const {
    recordset: roles
  } = result

  return roles
} 

module.exports = {
  RoleModel,
  getAllRoles
};
