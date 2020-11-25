const express = require("express")
const router = express.Router()

const UsersDao = require("../database/dao/UsersDao")
const jwt = require("jsonwebtoken")
const config = require("../config")
const _ = require("lodash")
const { updateLastSession } = require("../database/dao/UsersDao")

const createAuthToken = (user) => {
  return jwt.sign(_.omit(user, "password"), config.jwtPrivateKey);
};

router.post("/", async (req, res) => {
  console.log("POST /login", req.body)
  try {
    const {login, password} = req.body
    if (!login || !password)
      return res.status(400).send("Bad request! 'login' or 'password' undefined.")

    const user = await UsersDao.findByLogin(login)
      
    if (!user) {
      return res.status(400).send("User with given login is not registered!");
    }
    
    if (req.body.password !== user.password) {
      return res.status(400).send("Password incorrect!");    
    }

    user.role = user.Role.roleName
    delete user.Role
    
    const token = createAuthToken(user);
    res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, "email", "firstName", "lastName"));
    
    updateLastSession(user.userId)
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

module.exports = router;
