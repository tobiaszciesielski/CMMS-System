"use strict";

const config = require("./config");
const cors = require("cors");
const express = require("express");
const db = require("./database/db");

const app = express();

app.use(cors());
app.use(express.json());

const port = config.port || 8080;
app.listen(port, () => console.log(`Server listen on port ${config.port}`));

// HOME PAGE
app.get("/", async (req, res) => {

  const result = await db.model("users").findAll()
  res.send(result)
});

