const express = require("express")
const router = express.Router()

CategoriesDao

router.get("/", async (req, res) => {
  console.log("get /categories", req.body)
  try {

  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

module.exports = router;
