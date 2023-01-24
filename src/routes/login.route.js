const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express.Router();

app.get("/", (req, res) => {
  res.status(200).send({message: "Login User"});
});

app.post("/", async (req, res) => {
  const {email, password} = req.body;

  try {
    if (!email || !password) {
      return res.send({message: "Missing Details"});
    }

    const isExist = await User.findOne({email});
    if (!isExist) {
      return res.send({message: "Email does not exist"});
    }

    bcrypt.compare(password, isExist.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          {email, name: isExist.name, role: isExist.role},
          "SECRET",
          {expiresIn: "7 days"}
        );
        return res.send({token});
      }
      return res.send({message: "Wrong credentials"});
    });
  } catch (e) {
    res.status(404).send({message: e.message});
  }
});

module.exports = app;
