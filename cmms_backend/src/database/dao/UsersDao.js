const db = require("../db")

const {Users, Roles} = db.models

const findByLogin = async (userLogin) => {
  return Users.findOne({
    where: {
      login: userLogin
    },
    include: Roles,
    nest: true,
    raw: true
  })
} 

const updateLastSession = async (id) => {
  const now = new Date()
  return Users.update(
    {lastSession: now.toISOString()},
    {where: {userId: id}}
  )
}

module.exports = {
  findByLogin,
  updateLastSession
}
