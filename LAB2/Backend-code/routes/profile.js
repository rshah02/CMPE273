const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
var con = require("../database/db");
const passport = require("passport");
const User = require("../models/User");
router.get("/", (req, res) => {
  console.log("email:" + req.body.email);
  const email = req.query.email;
  User.findOne({ email }).then(user => {
    console.log(user);
    res.json(user);
  });
});

router.post("/", (req, res) => {
  const email = req.body.email;

  console.log(req.body.email);
  console.log(req.body.city);
  User.findOneAndUpdate({ email: email }, req.body, { new: true })
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
