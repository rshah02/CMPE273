const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
var con = require("../database/db");
const passport = require("passport");
const User = require("../models/User");
var kafka = require("../kafka/client");
router.get("/", (req, res) => {
  console.log("email:" + req.body.email);
  const email = req.query.email;
  /* User.findOne({ email })
    .then(user => {
      console.log(user);
      res.json(user);
    })
    .catch(err => {
      res.json({ message: err });
    }); */

  kafka.make_request("getProfile", req.query, function(err, result) {
    if (result) {
      console.log("result: " + result);
      res.status(200).json(result);
    } else res.status(400).json({ message: err });
  });
  //Query
});

router.post("/", (req, res) => {

  kafka.make_request("updateProfile", req.body, function(err, result) {
    if (result) {
      console.log("result: " + result);
      res.status(200).json(result);
    } else res.status(400).json({ message: err });
  });



 /* const email = req.body.email;

  console.log(req.body.email);
  console.log(req.body.city);
  User.findOneAndUpdate({ email: email }, req.body, { new: true })
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    }); */
});

module.exports = router;
