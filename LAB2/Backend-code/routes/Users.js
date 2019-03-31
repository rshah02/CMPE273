const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
var con = require("../database/db");
const passport = require("passport");
const gravatar = require("gravatar");
const User = require("../models/User");

router.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  //Find user Query
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    //hash the password and match with current one
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          email: user.email
        };

        //sign Token
        jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
          console.log("Bearer " + token);
        });
      } else {
        return res.status(400).json({ password: "incorrect password" });
      }
    });
  });
});

router.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          throw err;
        }
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          type: req.body.type,
          avatar,
          password: hash
        });
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    }
  });
});

router.get(
  "/courses",

  (req, res) => {
    const sql =
      "SELECT * from enrollment e,course c WHERE e.userId=346" +
      " AND e.courseId=c.courseId";
    con.query(sql, (err, results) => {
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
    res.json(req.user);
  }
);
module.exports = router;

//login

/*  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          email: user.email
        };

        //sign Token
        jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
          console.log("Bearer " + token);
        });
      } else {
        return res.status(400).json({ password: "incorrect password" });
      }
    });
  }); */

// con.query("SELECT * FROM users WHERE email = ?", [email], function(
//   error,
//   results,
//   fields
// ) {
//   if (error) {
//     res.json({
//       status: false,
//       message: "there are some error with query"
//     });
//   } else {
//     if (results.length > 0) {
//       bcrypt.compare(password, results[0].password, function(err, ress) {
//         if (!ress) {
//           res.json({
//             status: false,
//             message: "Email and password does not match"
//           });
//         } else {
//           //user matched
//           //create payload
//           const payload = {
//             name: results[0].name,
//             email: results[0].email,
//             type: results[0].type,
//             city: results[0].city,
//             country: results[0].country,
//             phone: results[0].phone,
//             school: results[0].school,
//             userId: results[0].userId,
//             gender: results[0].gender,
//             languages: results[0].languages,
//             company: results[0].company
//           };

//           //sign Token
//           jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
//             res.json({
//               success: true,
//               token: "Bearer " + token
//             });
//             console.log("Bearer " + token);
//           });
//         }
//       });
//     } else {
//       res.json({
//         status: false,
//         message: "Email does not exits"
//       });
//     }
//   }
// });
