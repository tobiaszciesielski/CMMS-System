const express = require('express')
let router = require('./auth')
router = express.Router()

const ProducersDao = require("../database/dao/ProducersDao")

router.get("/", async (req, res) => {
  const result = await ProducersDao.findAll()
  res.status(200).send(result)
})

router.get("/:id", async (req, res) => {
  const result = await ProducersDao.findById(req.params.id)
  res.status(200).send(result)
})

module.exports = router;
