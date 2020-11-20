const express = require("express");
const router = express.Router();

const _ = require("lodash");

const User = require("../models/User");
const { validateUser } = require("../models/User");

const login = async (req, res) => {
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
}

// Register user
router.post("/register", async (req, res) => {
  console.log("POST /users/register", req.body);
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

// Get all users
router.get("/", async (req, res) => {
  res.status(200).send("If you are admin - take all users");
})

// Update USER
router.put("/users/:id", async (req, res) => {
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

// Delete user
router.delete("/:id", async (req, res) => {
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

module.exports = {
  router,
  login
}