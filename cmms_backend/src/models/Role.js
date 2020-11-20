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

const getAll = async () => {
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

const getById = async (roleId, pool) => {
  const { id, role } = RoleModel
  const idParam = "id"

  if (!pool) pool = await poolPromise;
  const result = await pool.request()
    .input(idParam, id.sqlType, roleId)
    .query(`
      SELECT 
        ${id.colName} as [${RoleKeys[0]}], 
        ${role.colName} as [${RoleKeys[1]}]
      FROM roles
      WHERE ${id.colName}=@${idParam}
    `);

  const {
    recordset: [roles]
  } = result

  return roles
}

module.exports = {
  RoleModel,
  getAll,
  getById
};
