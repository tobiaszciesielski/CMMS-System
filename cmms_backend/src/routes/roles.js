const express = require("express");
const router = express.Router();

const Role = require("../models/Role")

router.get("/", async (req, res) => {
  console.log('GET /roles', req.body, req.params)
  try {
    const roles = await Role.getAll();
    if (!roles) return res.status(400).send("No roles found")
    res.status(200).send(roles)
  } catch (err) {
    res.status(500).send(err.message);
  }
})

router.get("/:id", async (req, res) => {
  console.log(`GET /roles/:id`, req.body, req.params)
  try {
    const { id } = req.params;
    const role = await Role.getById(id);
    if (!role) return res.status(400).send("Role with given id not found")
    res.status(200).send(role)
  } catch (err) {
    res.status(500).send(err.message);
  }
})

module.exports = router;