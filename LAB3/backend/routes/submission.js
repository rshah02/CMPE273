const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const mysql = require("mysql");
var con = require("../database/db");
const mongoose = require("mongoose");
const Course = require("../models/Course");
const passport = require("passport");
route.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const date = new Date();
    let uploadFile = req.files.file;
    const fileName = req.files.file;
    console.log("filename:" + req.files.file);
    console.log(req.body.assignmentName);
    console.log("reqparams:" + req.params.id);
    console.log(fileName);
    console.log(uploadFile);
    uploadFile.mv(
      `${__dirname}/../public/files/assignments/${fileName}`,
      function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        console.log("path:" + `${__dirname}/../public/files/${fileName}`);
      }
    );
    Course.findById(req, params.id).then(course => {
      Course.findById(req.params.id).then(course => {
        //define a map flag to check if assignment already exists
        const match = course.submission
          .map(submission => submission.submissionName)
          .indexOf(req.body.submissionName);
        if (match === 0) {
          res.json({ message: "already submitted" });
        } else {
          //add user at the top of the array
          const newSubmission = {
            submissionName: req.body.assignmentName,
            submissionDetails: req.body.submissionDetails,
            file: fileName,
            assignmentId: req.body.assignmentId,
            Grades: "",
            userId: req.user._id,
            submissionDate: date
          };
          course.submissions.unshift(newSubmission);
          course
            .save()
            .then(course => res.json({ message: "success" }))
            .catch(err => res.json({ message: err }));
        }
      });
    });
  }
);

route.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findById(req.params.id)
      .then(course => {
        const match = course.submission
          .filter(submission => submission.assignmentId)
          .indexOf(req.body.assignmentId);
        if (match == 0) {
          res.status(200).json(course.submission);
        } else {
          res.status(400).json({ message: "no submissions" });
        }
      })
      .catch(err => {
        res.status(400).json({ message: "course not found" });
      });
  }
);
