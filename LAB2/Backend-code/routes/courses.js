const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const mysql = require("mysql");
var con = require("../database/db");
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
  const sql =
    "SELECT * FROM assignment WHERE courseId=" +
    mysql.escape(req.body.courseId) +
    " AND assignmentType='assignment'";
  con.query(sql, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: err });
    }
  });
});

route.post("/assignments", function(req, res) {
  const sql =
    "INSERT INTO assignment (assignmentTitle,assignmentDetail,courseId,assignmentType,points,dueDate) VALUES (" +
    mysql.escape(req.body.assignmentTitle) +
    "," +
    mysql.escape(req.body.assignmentDetail) +
    "," +
    mysql.escape(req.body.courseId) +
    "," +
    mysql.escape(req.body.assignmentType) +
    "," +
    mysql.escape(req.body.points) +
    "," +
    mysql.escape(req.body.dueDate) +
    ")";
  con.query(sql, (err, result) => {
    if (result) {
      res.send({ status: "assignemnt added" });
    } else {
      res.status(400).send({ message: err.sqlMessage });
    }
  });
});
module.exports = route;
