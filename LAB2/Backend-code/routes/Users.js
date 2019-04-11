const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//const mysql = require("mysql");
const jwt = require("jsonwebtoken");
var con = require("../database/db");
const passport = require("passport");
const User = require("../models/User");
const mongoose = require("mongoose");
var kafka = require("../kafka/client");

// //kafka login
// router.post("/login", function(req, res) {
//   console.log("Inside login POST");
//   console.log("Request Body: ", req.body);

//   //Kafka request

//   kafka.make_request("login", req.body, function(err, result) {
//     if (err) {
//       console.log("Inside err login");
//       res.status(400).json({ message: "error in login" });
//     } else {
//       console.log("Inside results Login");
//       if (result) {
//         // req.session.user = result;

//         // Create token if the password matched and no error was thrown
//         jwt.sign(result, "secret", { expiresIn: "1h" }, (err, token) => {
//           res.json({
//             success: true,
//             token: "Bearer " + token
//           });
//           console.log("Bearer " + token);
//         });
//       } else {
//         return res.status(400).json({ password: "incorrect password" });
//       }
//     }
//   });
//   //Query
// });

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
          email: user.email,
          type: user.type
        };

        //sign Token
        jwt.sign(payload, "secret", { expiresIn: "1h" }, (err, token) => {
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
  kafka.make_request("signup", req.body, function(err, result) {
    console.log("In results Signup");
    console.log("Results: ", result);
    if (result) {
      console.log("User saved successfully.");
      res.writeHead(200, {
        "Content-type": "text/plain"
      });
      res.end("Adding a user successful!");
    } else if (result == null) {
      console.log("User already exists.");
      res.writeHead(210, {
        "Content-type": "text/plain"
      });
      res.end("Dupplicate user!");
    }

    if (err) {
      console.log("Unable to fetch user details. Error in Signup.", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in fetching user details!");
    }
  });

  /* User.findOne({ email: req.body.email }).then(user => {
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
          _id: new mongoose.Types.ObjectId(),
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
  }); */
});

router.get(
  "/mycourses",

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
