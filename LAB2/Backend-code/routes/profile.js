const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
var con = require("../database/db");
const passport = require("passport");
const User = require("../models/User");
router.get("/", (req, res) => {
  console.log("email:" + req.query.email);
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

  /*User.findOneAndUpdate(
    req.user.email,
    {$set:req.user},
    { new: true },
    (err, result) => {
      console.log(result );
      if (err) return res.status(500).send(err);

      return res.json(result);
    } 
  );
  console.log("called");

  /*let sql =
    "UPDATE users SET name=" +
    mysql.escape(req.user.name) +
    ",phone=" +
    mysql.escape(req.user.phone) +
    ",city=" +
    mysql.escape(req.user.city) +
    ",country=" +
    mysql.escape(req.user.country) +
    ",school=" +
    mysql.escape(req.user.school) +
    ",company=" +
    mysql.escape(req.user.company) +
    ",languages=" +
    mysql.escape(req.user.languages) +
    ",about=" +
    mysql.escape(req.user.about) +
    " WHERE email=" +
    mysql.escape(req.user.email);
  con.query(sql, function(err, result) {
    if (result) {
      res.send({
        message: "profile updated"
      });
    } else {
      console.log(err);
    }
  }); */
});

module.exports = router;
