const express = require("express");
const route = express.Router();
const Course = require("../models/Course");
route.post("/", (req, res) => {
  console.log(req.body.courseId);
  Course.findById(req.body.courseId)
    .then(course => {
      console.log(course);
      waitlist = course.waitlistCapacity;
      console.log(course.waitlistCapacity);

      while (waitlist > 0) {
        let r = Math.floor(Math.random() * 100) + 1;
        if (course.permissionNumber.indexOf(r) == -1) {
          course.permissionNumber.push(r);
          waitlist--;
        }
      }
      course
        .save()
        .then(course => {
          console.log(course);
          res.status(200).json(course.permissionNumber);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = route;
