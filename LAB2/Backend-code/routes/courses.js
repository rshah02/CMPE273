const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/User");
route.get("/", function(req, res) {
  console.log(req.body.data);
  Course.find()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: err });
    });
});
route.post("/", (req, res) => {
  console.log("req:" + req.body);
  Course.findOne({ courseName: req.body.courseName }).then(course => {
    if (course) {
      return res.status(400).json({ course: "course Already exists" });
    } else {
      const newCourse = new Course({
        _id: new mongoose.Types.ObjectId(),
        courseName: req.body.courseName,
        courseDept: req.body.courseDept,
        courseTerm: req.body.courseTerm,
        courseDescription: req.body.courseTerm,
        courseRoom: req.body.courseRoom,
        courseCapacity: req.body.courseCapacity,
        waitlistCapacity: req.body.courseCapacity,
        lectureTime: req.body.lectureTime
      });
      newCourse
        .save()
        .then(course => {
          console.log(course);
          res.json({ message: "added course successfully" });
        })

        .catch(err => console.log(err));
    }
  });
});

route.get("/assignments", function(req, res) {
  console.log(req.query.courseId);
  Course.findById(req.query.courseId)
    .then(course => {
      console.log(course.assignments);
      res.status(200).json(course.assignments);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

route.post("/assignments", function(req, res) {
  Course.findById(req.body.courseId).then(course => {
    //define a map flag to check if assignment already exists
    match = course.assignments
      .map(assignment => assignment.assignmentName)
      .indexOf(req.body.assignmentName);
    if (match === 0) {
      res.json("Assignment  exists");
    } else {
      //add user at the top of the array
      const newAssignment = {
        assignmentName: req.body.assignmentName,
        assignmentDetail: req.body.assignmentDetail,
        file: req.body.file,
        assignmentType: req.body.assignmentType,
        points: req.body.points,
        dueDate: req.body.dueDate
      };
      course.assignments.unshift(newAssignment);
      course
        .save()
        .then(course => res.json({ success: course }))
        .catch(err => res.json({ message: err }));
    }
  });
});
module.exports = route;
