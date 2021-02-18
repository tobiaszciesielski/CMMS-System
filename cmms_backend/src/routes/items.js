const express = require('express')
let router = require('./auth')
router = express.Router()

const db = require("../database/db")
const { PropertiesValues } = db.models

const ItemsDao = require("../database/dao/ItemsDao")
const ProducersDao = require("../database/dao/ProducersDao")
const LocationsDao = require("../database/dao/LocationsDao")
const PropertiesValuesDao = require('../database/dao/PropertiesValuesDao')
const { forEach } = require('lodash')

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
      ? new Buffer.from(imageDataUrl.split(",")[1], 'base64')
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
    
    const item = await ItemsDao.create(form)
    console.log(item.itemId)

    for (let i = 0; i < propertyIdList.length; i++) {
      let a = {itemId: item.itemId, valueId: valueIdList[i], propertyId: propertyIdList[i]}
      console.log(a)
      // TODO: put here function to create PropertyValue for created item.
    }
    // PropertiesValues.create()
    // .then(([user, city]) => UserCity.create({userId: user.id, cityId: city.id}))

    // {
    //   "itemName": "Silnik BLDC",
    //   "producer": "Samsung",
    //   "producerId": "u273yru98ifm9783947hf",
    //   "serialNumber": "11-2234-4512-24",
    //   "quantity": "2",
    //   "storingLocation": "R-21/C-66",
    //   "destiny": "Do napedzania linii",
    //   "description": "Prosze uwazac na podlaczenie",
    //   "properties": [
    //     {
    //       "property": "asdwa",
    //       "value": "czerwony"
    //     }
    //   ],
    //   "image": null,
    //   "subSubCategoryId": 6
    // }

    console.log(JSON.stringify(form))
    // const item = await ItemsDao.create(form)

    res.status(200).send("Created")
  } catch (err) {
    console.log(err)
    res.status(400).send("failed")
  }
})

module.exports = router;

// {
//     "itemId": 8,
//     "itemName": "Silnik BLDC",
//     "serialNumber": "11-2234-4512-24",
//     "subSubCategoryId": 6,
//     "producerId": 1,
//     "inStock": 2,
//     "image": {
//         "type": "Buffer",
//         "data": null 
//       },
//     "destiny": "Do napedzania linii",
//     "description": "Prosze uwazac na podlaczenie                                                                                                                                                                                                                                   ",
//     "storingLocationId": null,
//     "producerId": 1,
//     "PropertiesValues": []
// }
