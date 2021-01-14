const express = require('express')
let router = require('./auth')
router = express.Router()

const LocationsDao = require("../database/dao/LocationsDao")

router.get("/", async (req, res) => {
  const result = await LocationsDao.findAll()
  res.status(200).send(result)
})

router.get("/:id", async (req, res) => {
  const result = await LocationsDao.findById(req.params.id)
  res.status(200).send(result)
})

router.post("/", async (req, res) => {
  await LocationsDao.create(req.body)
  res.status(200).send("Created")
})

module.exports = router;
