const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const mysql = require("mysql");
var con = require("../database/db");
const Course = require("../models/Course");
const User = require("../models/User");
const passport = require("passport");
route.get("/", (req, res) => {
  const sql =
    "SELECT * from enrollment e,users u WHERE e.courseId=" +
    mysql.escape(req.body.courseId) +
    " AND e.userId=u.userId";

  con.query(sql, (err, result) => {
    if (err) {
      res.status(400).send({ message: err });
    } else {
      res.status(200).json(result);
    }
  });
});

route.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find Course object
    Course.findById(req.body.courseId).then(course => {
      //define a map flag to check if user already exists
      match = course.users.map(book => book.id).indexOf(req.user.id);
      if (match === 0) {
        res.json("user exists");
      } else {
        //add user at the top of the array
        course.users.unshift(user);
        course
          .save()
          .then(course => res.json({ success: course }))
          .catch(err => res.json({ message: err }));
      }
    });
  }
);

route.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find Course object
    Course.findById(req.body.courseId).then(course => {
      //define a map flag to check if user already exists
      const removeIndex = course.users
        .map(book => book.id)
        .indexOf(req.user.id);
      console.log(removeIndex);
      course.users.splice(removeIndex, 1);
      course
        .save()
        .then(course => res.json(course))
        .catch(err => res.json({ message: err }));
    });
  }
);

module.exports = route;
