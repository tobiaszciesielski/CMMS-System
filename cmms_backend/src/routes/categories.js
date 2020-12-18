const express = require("express")
const router = express.Router()

const jwt = require("jsonwebtoken")
const config = require("../config")

const CategoriesDao = require("../database/dao/CategoriesDao")
const UsersDao = require("../database/dao/UsersDao")

router.get("/", async (req, res) => {
  console.log("get /categories", req.body)
  try {
    const tree = await CategoriesDao.getCategoriesTree()
    res.status(200).send(tree)
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

router.post("/", async (req, res) => {
  console.log("post /categories", req.body, req.header("x-auth-token"))
  try {
    let token = req.headers["x-auth-token"]

    if (!token) 
      return res.status(401).send('Status 401: Unauthorized')
    
    await jwt.verify(token, config.jwtPrivateKey, async (error, user) => {
      if (error) {
        res.status(401).send("Status 401: Token invalid")
      } else {
        let { Role } = await UsersDao.findById(user.userId)
        if (Role.roleName !== user.role) 
          return res.status(403).send("Status 403: Forbidden")  
        if (!req.body.categoryList)      
          return res.status(400).send("Status 400: Bad request")  
        await CategoriesDao.setCategoriesTree(req.body)
        return res.status(200).send("Categories saved properly")
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

module.exports = router;
