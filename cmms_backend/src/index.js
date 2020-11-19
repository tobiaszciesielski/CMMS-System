"use strict";

const _ = require("lodash");
const config = require("./config");
const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

const users = require("./routes/users");
const categories = require("./routes/categories");
const roles = require("./routes/roles")

const port = config.port || 8080;
app.listen(port, () => console.log(`Server listen on port ${config.port}`));

// HOME PAGE
app.get("/", (req, res) => {
  try {
    res.status(200).send("Hello :)");
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Users
app.post("/login", users.login);
app.use("/users", users.router);

// Categories
app.use("/categories", categories)

// User roles
app.use("/roles", roles);
