const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var con = require("../database/db");
const passport = require("passport");
const User = require("../models/User");
const mongoose = require("mongoose");
var kafka = require("../kafka/client");
var gravatar = require("gravatar");
// //kafka login

/*router.post("/login", function(req, res) {
  console.log("Inside login POST");
  console.log("Request Body: ", req.body);
  //Kafka request
  kafka.make_request("login", req.body, function(err, result) {
    if (err) {
      console.log("Inside err login");
      res.status(400).json({ message: "error in login" });
    } else {
      console.log("Inside results Login");
      if (result) {
        console.log("userid:" + result._id);
        const payload = {
          id: result._id,
          name: result.name,
          avatar: result.avatar,
          email: result.email,
          type: result.type
        };
        // Create token if the password matched and no error was thrown
        jwt.sign(payload, "secret", { expiresIn: "1h" }, (err, token) => {
          res.json({
            token: "Bearer " + token
          });
          console.log("Bearer " + token);
        });
      } else {
        return res.status(400).json({ message: "incorrect password" });
      }
    }
  });
}); */

//kafka login
//kafka signup
/*
router.post("/signup", (req, res) => {
  kafka.make_request("signup", req.body, function(err, result) {
    console.log("In results Signup");
    console.log("Results: ", result);
    if (!result == null) {
      res.status(200).json({ message: "user added successfully" });
    } else if (result == null && err == null) {
      console.log("User already exists.");
      res.status(210).json({ message: "duplicate user" });
    }

    if (err) {
      res.status(400).json({ message: "unable to fetch users" });
    }
  });
});
*/
//kaffka signup

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("current");
    res.json(req.user);
  }
);

//local code
//login
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

//signup
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
  });
});
module.exports = router;
