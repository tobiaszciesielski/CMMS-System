const express = require('express')
let router = require('./auth')
router = express.Router()

const ItemsDao = require("../database/dao/ItemsDao")


router.get("/", async (req, res) => {
  const result = await ItemsDao.findAll()
  res.status(200).send(result)
})

router.get("/:id", async (req, res) => {
  const result = await ItemsDao.findById(req.params.id)
  res.status(200).send(result)
})

router.post("/", async (req, res) => {
  console.log(req.body)
  await ItemsDao.create(req.body)
  res.status(200).send("Created")
})

module.exports = router;
