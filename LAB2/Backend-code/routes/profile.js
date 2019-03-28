const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
var con = require("../database/db");
const passport = require("passport");

router.get("/", (req, res) => {
  res.json({ message: "this works" });
});

/*router.get("/", (req, res) => {
  let sql =
    "SELECT * FROM users where userId=" + mysql.escape(req.query.userId);
});
router.post("/", (req, res) => {
  let sql =
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
  });
});*/

module.exports = router;
