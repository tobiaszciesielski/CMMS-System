const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("Get all categories");

  res.status(500).send("Get all categories")
})

module.exports = router;
 