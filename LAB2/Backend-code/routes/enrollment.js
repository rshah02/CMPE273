const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const mysql = require("mysql");
var con = require("../database/db");
const Course = require("../models/Course");
const User = require("../models/User");
const passport = require("passport");
route.get("/:id", (req, res) => {
  console.log("get users");
  console.log("params" + req.params.id);
  console.log("courseId:" + req.query.courseId);
  Course.findById(req.params.id)
    .then(course => {
      console.log("in requets");
      const enroll = [];
      console.log(course.users.length);
      if (course.users.length === 0) {
        res.json({ message: "there is no enrollment" });
      } else {
        course.users.map(user => {
          console.log(user);
          User.findById(user._id)
            .then(user => {
              console.log("user:" + user);
              enroll.push(user);
              console.log("enroll:" + enroll);
              res.json(enroll);
            })
            .catch(err => {
              console.log("no user" + err);
            });
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });

  /*const sql =
    "SELECT * from enrollment e,users u WHERE e.courseId=" +
    mysql.escape(req.body.courseId) +
    " AND e.userId=u.userId";

  con.query(sql, (err, result) => {
    if (err) {
      res.status(400).send({ message: err });
    } else {
      res.status(200).json(result);
    }
  }); */
});
//add enrollment
route.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find Course object
    console.log("courseId:" + req.body.courseId);
    Course.findById(req.body.courseId).then(course => {
      //define a map flag to check if user already exists
      console.log("inside course");
      match = course.users.map(book => book.id).indexOf(req.user.id);
      if (match === 0) {
        res.json("user exists");
      } else {
        //add user at the top of the array
        course.users.unshift(req.user);
        course
          .save()
          .then(course => res.json({ success: course.users }))
          .catch(err => res.json({ message: err }));
      }
    });
  }
);
// remove enrollment
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
