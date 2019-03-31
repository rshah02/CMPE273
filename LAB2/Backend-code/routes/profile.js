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
  User.findOneAndUpdate(
    req.body.email,
    {$set:req.body},
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
    mysql.escape(req.body.name) +
    ",phone=" +
    mysql.escape(req.body.phone) +
    ",city=" +
    mysql.escape(req.body.city) +
    ",country=" +
    mysql.escape(req.body.country) +
    ",school=" +
    mysql.escape(req.body.school) +
    ",company=" +
    mysql.escape(req.body.company) +
    ",languages=" +
    mysql.escape(req.body.languages) +
    ",about=" +
    mysql.escape(req.body.about) +
    " WHERE email=" +
    mysql.escape(req.body.email);
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
