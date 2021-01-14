"use strict";

const config = require("./config");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const authRouter = require("./routes/auth")
const categoriesRouter = require("./routes/categories")
const producersRouter = require("./routes/producers")
const locationsRouter = require("./routes/locations")

const port = config.port || 8080;
app.listen(port, () => console.log(`Server listen on port ${config.port}`));

// auth
app.use("/login", authRouter);

// categories
app.use("/categories", categoriesRouter)

// producers
app.use("/producers", producersRouter)

// storing locations
app.use("/locations", locationsRouter)
