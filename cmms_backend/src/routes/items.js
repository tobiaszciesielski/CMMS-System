const express = require('express')
let router = require('./auth')
router = express.Router()

const ItemsDao = require("../database/dao/ItemsDao")
const ProducersDao = require("../database/dao/ProducersDao")
const LocationsDao = require("../database/dao/LocationsDao")

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
    const {image, quantity, properties, ...form} = req.body
    
    const img = image 
      ? new Buffer.from(imageDataUrl.split(",")[1], 'base64')
      : undefined

    form.image = img
    form.inStock = parseInt(quantity)
    form.PropertiesValues = properties
    const location = await LocationsDao.findOrCreate(form.storingLocation)
    console.log(location)
    
    // {
    //   "itemName": "Silnik BLDC",
         // IF PRODUCER NOT EXISTS
    //   "producer": "Apple",
    //   "producerNumber": 1,
    //   "serialNumber": "11-2234-4512-24",
    //   "storingLocation": "X-2",
    //   "destiny": "Do napedzania linii",
    //   "description": "Prosze uwazac na podlaczenie",
    //   "properties": [
    //     {
    //       "property": "kolor",
    //       "value": "czerwony"
    //     },
    //     {
    //       "property": "rozmiar",
    //       "value": "duże"
    //     }
    //   ],
    //   "subSubCategoryId": 4,
    //   "image": null,
    //   "inStock": 1
    // }


    // ([item_name],[serial_number],[sub_sub_category_id],[producer_id],[in_stock],[destiny],[description])

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
  //     "Producer": {
  //         "producerId": 1,
  //         "producerName": "Samsung",
  //         "producerCode": "u273yru98ifm9783947hf"
  //     },
  //     "SubSubCategory": {
  //         "subSubCategoryId": 6,
  //         "subSubCategoryName": "bldc",
  //         "subCategoryId": 2
  //     },
  //    "StoringLocation": null,
  //    "PropertiesValues": []
  // }
