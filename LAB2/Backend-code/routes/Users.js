const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
var con = require("../database/db");
const passport = require("passport");

router.get("/test", (req, res) => {
  res.json({ message: "hello" });
});

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    const sql =
      "INSERT INTO users (name,email,password,type)VALUES(" +
      mysql.escape(req.body.name) +
      "," +
      mysql.escape(req.body.email) +
      "," +
      mysql.escape(hash) +
      "," +
      mysql.escape(req.body.type) +
      ")";
    con.query(sql, function(err, result) {
      if (result) {
        res.send({
          status: "user registered"
        });
      } else {
        res.status(400).send({
          message: err.sqlMessage
        });
      }
    });
  });
});

router.post("/profile", (req, res) => {
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
});

router.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  con.query("SELECT * FROM users WHERE email = ?", [email], function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.json({
        status: false,
        message: "there are some error with query"
      });
    } else {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, function(err, ress) {
          if (!ress) {
            res.json({
              status: false,
              message: "Email and password does not match"
            });
          } else {
            //user matched
            //create payload
            const payload = {
              name: results[0].name,
              email: results[0].email,
              type: results[0].type,
              city: results[0].city,
              country: results[0].country,
              phone: results[0].phone,
              school: results[0].school,
              userId: results[0].userId,
              gender: results[0].gender,
              languages: results[0].languages,
              company: results[0].company
            };

            //sign Token
            jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
              console.log("Bearer " + token);
            });
          }
        });
      } else {
        res.json({
          status: false,
          message: "Email does not exits"
        });
      }
    }
  });
});

router.get(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.query);
    const sql =
      "SELECT * from enrollment e,course c WHERE e.userId=" +
      mysql.escape(req.query.userId) +
      " AND e.courseId=c.courseId";
    con.query(sql, (err, results) => {
      console.log(sql);
      if (results) {
        res.status(200).json(results);
        console.log(results);
      } else {
        res.status(400).json({ message: err });
      }
    });
  }
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("current");
    res.json({ message: "success" });
  }
);
module.exports = router;
