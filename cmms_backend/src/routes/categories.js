const express = require("express")
const jwt = require("jsonwebtoken")
const { jwtPrivateKey } = require("../config")
const router = express.Router()

const CategoriesDao = require("../database/dao/CategoriesDao")

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
  console.log("get /categories", req.body, req.header("x-auth-token"))
  try {
    let token = req.header("x-auth-token")
    if (!token) 
      return res.status(401).send('Status 401: Unauthorized')
    
    res.status(200).send(jwt.verify(token, jwtPrivateKey))

  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

module.exports = router;
