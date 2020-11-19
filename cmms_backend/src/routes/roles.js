const express = require("express");
const router = express.Router();

const Role = require("../models/Role")

router.get("/", async (req, res) => {
  const roles = await Role.getAllRoles();
  console.log(roles);
})

module.exports = router;