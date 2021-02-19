const express = require('express')
let router = require('./auth')
router = express.Router()

const ItemsDao = require("../database/dao/ItemsDao")
const ProducersDao = require("../database/dao/ProducersDao")
const LocationsDao = require("../database/dao/LocationsDao")
const PropertiesValuesDao = require('../database/dao/PropertiesValuesDao')

router.get("/", async (req, res) => {
  const result = await ItemsDao.findAll()
  res.status(200).send(result)
})

router.get("/:id", async (req, res) => {
  const result = await ItemsDao.findById(req.params.id)
  res.status(200).send(result)
})

router.post("/add", async (req, res) => {
  try {
    const {image, quantity, properties, storingLocation,...form} = req.body
    
    const img = image 
      ? new Buffer.from(image.split(",")[1], 'base64')
      : undefined
    
    const { storingLocationId } = await LocationsDao.findOrCreate(storingLocation)

    const { producerId } = await ProducersDao.findOrCreate(
      {"producerCode": form.producerId, "producerName": form.producer}
    )
  
    const [propertyIdList, valueIdList] = await PropertiesValuesDao.createPropertiesAndValues(properties)

    form.image = img
    form.inStock = parseInt(quantity)
    form.storingLocationId = storingLocationId
    form.producerId = producerId
    form.subSubCategoryId
    
    const {itemId} = await ItemsDao.create(form)
    await PropertiesValuesDao.createPropertiesValues(itemId, propertyIdList, valueIdList)
  
    res.status(200).send("Created")
  } catch (err) {
    console.log(err)
    res.status(400).send("Failed create")
  }
})

module.exports = router;
