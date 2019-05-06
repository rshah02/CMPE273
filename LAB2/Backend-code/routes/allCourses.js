const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/Course");
var kafka = require("../kafka/client");
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
  // kafka request
  /* kafka.make_request("getAllCourses", req.body, function(err, result) {
    if (result) {
      console.log("result: " + result);
      res.status(200).json(result);
    } else res.status(400).json({ message: err });
  }); */
});
module.exports = route;
