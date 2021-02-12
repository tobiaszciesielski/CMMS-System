const express = require('express')
let router = require('./auth')
router = express.Router()

const fetch = require('node-fetch')

const ItemsDao = require("../database/dao/ItemsDao")


router.get("/", async (req, res) => {
  const result = await ItemsDao.findAll()
  res.status(200).send(result)
})

router.get("/:id", async (req, res) => {
  const result = await ItemsDao.findById(req.params.id)
  res.status(200).send(result)
})

router.post("/add", async (req, res) => {
  console.log(req.body)
  const dataUrl = req.body.image
  const img = new Buffer.from(dataUrl.split(",")[1], 'base64');
  const {image, quantity, ...form} = req.body
  form.image = img
  form.inStock = parseInt(quantity)

  // TO CHANGE
  form.subSubCategoryId = 6
  form.producerId = 1
  // TO CHANGE 
  
  console.log(form)
  await ItemsDao.create(form)
  res.status(200).send("Created")
})

module.exports = router;
