const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/Course");

const passport = require("passport");

route.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Course.find()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.staus(400).json(err);
    });
});
module.exports = route;
