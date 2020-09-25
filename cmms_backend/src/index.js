"use strict";

const _ = require("lodash");
const config = require("./config");
const cors = require("cors");
const express = require("express");

const User = require("./models/User");
const { validateUser } = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

const port = config.port || 8080;
app.listen(port, () => console.log(`Server listen on port ${config.port}`));

// HOMME PAGE
app.get("/", (req, res) => {
  try {
    res.status(200).send("Hello :)");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login USER
app.post("/login", async (req, res) => {
  console.log("POST /login", req.body);
  try {
    const error = User.validateLogin(req.body);
    if (error) return res.status(400).send(error);

    const user = await User.findByLogin(req.body.login);
    if (!user)
      return res.status(400).send("User with given login is not registered!");

    // TODO
    // TODO bcrypt password
    // TODO
    if (user.password !== req.body.password)
      return res.status(400).send("Password incorrect!");

    const token = User.createAuthToken(user);
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, "email", "firstName", "lastName"));
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// Register USER
app.post("/register", async (req, res) => {
  console.log("POST /register", req.body);
  try {
    const error = validateUser(req.body);
    if (error) return res.status(400).send(error);

    const { login } = req.body;
    const user = await User.findByLogin(login);
    if (user) return res.status(400).send("User already registered!");

    await User.create(req.body);
    return res.status(200).send("User registered succesfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete USER
app.delete("/users/:id", async (req, res) => {
  console.log("DELETE /users/id", req.params);
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(400).send("User does not exist!");

    await User.remove(id);
    res.status(200).send(`Deleted user with id: ${id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update USER
app.put("/users/:id", async (req, res) => {
  console.log("PUT /users/id", req.body, req.params);
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(400).send("User does not exist!");
    // ! BUG
    // ! BUG
    // ! BUG
    // if (req.body.login && req.body.login === user.login)
    //   return res.status(400).send("The given login is already taken");

    const updatedUser = Object.assign(user, req.body);
    const error = validateUser(_.omit(updatedUser, "id"));
    if (error) return res.status(400).send(error);

    await User.update(updatedUser);
    res.status(200).send(`Updated user with id ${id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
