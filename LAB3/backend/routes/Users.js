const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const mongoose = require("mongoose");
var gravatar = require("gravatar");

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
