const express = require("express")
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

module.exports = router;
