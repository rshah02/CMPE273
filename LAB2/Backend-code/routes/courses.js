const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/Course");
var kafka = require("../kafka/client");
const passport = require("passport");
//file start
const fileUpdload = require("express-fileupload");

route.use(
  fileUpdload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: `${__dirname}/../public/temp`,
    responseOnLimit: "File size limit has been reached"
  })
);

//file end

//get all my the courses without authentication
route.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  //kafka request
  /*kafka.make_request("getAllCourses", req.body, function(err, result) {
    if (result) {
      console.log("result: " + result);
      res.status(200).json(result);
    } else res.status(400).json({ message: err });
  }); */
  console.log(req.body.data);
  console.log(req.user.id);
  Course.find({ users: { _id: req.user.id } })
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: err });
    });
});

//create new course
route.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req:" + req.body);
    kafka.make_request("createNewCourse", req.body, function(err, result) {
      if (err) {
        res.status(500).json({ message: "error createing course" + err });
      } else {
        if (result) {
          res.status(200).json({ message: "course addded successfullu" });
        } else if (result == null) {
          res.status(400).json({ message: "course already exists" });
        }
      }
    });

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
            course.users.push(req.user);
            course
              .save()
              .then(course => {
                console.log(course.users);
                res.json({ message: "added course successfully" });
              })
              .catch(err => console.log(err));
            console.log(course);
          })

          .catch(err => console.log(err));
      }
    });
  }
);

route.get("/:id/assignments", function(req, res) {
  console.log("params:" + req.params.id);
  Course.findById(req.params.id)
    .then(course => {
      console.log("assignments:" + course.assignments);
      res.status(200).json(course.assignments);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

//announcements
route.post("/:id/Announcements", function(req, res) {
  Course.findById(req.params.id).then(course => {
    const match = course.announcements.filter(
      announcement =>
        announcement.announcementTitle === req.body.announcementTitle
    );

    if (match.length !== 0) {
      res.json({ message: "announcement exists" });
    } else {
      const newAnnouncement = {
        announcementTitle: req.body.announcementTitle,
        announcementDetails: req.body.announcementDetails,
        announcementDate: Date.now()
      };
      course.announcements.push(newAnnouncement);
      course
        .save()
        .then(course => res.json(course.announcements))
        .catch(err => res.json({ message: err }));
    }
  });
});
//create a new assignment
route.post(
  "/:id/assignments",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Course.findById(req.params.id).then(course => {
      //define a map flag to check if assignment already exists
      const match = course.assignments
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
          dueDate: req.body.dueDate,
          createDate: Date.now()
        };
        course.assignments.unshift(newAssignment);
        course
          .save()
          .then(course => res.json({ success: course }))
          .catch(err => res.json({ message: err }));
      }
    });
  }
);

//create a new quiz
route.post("/quiz", function(req, res) {
  Course.findById(req.body.courseId).then(course => {
    //define a map flag to check if assignment already exists
    match = course.assignments
      .map(assignment => assignment.assignmentName)
      .indexOf(req.body.assignmentName);
    if (match === 0) {
      res.json("Quiz  exists");
    } else {
      //add user at the top of the array
      if (req.body.assignmentType === "quiz") {
      }
      const newAssignment = {
        assignmentName: req.body.assignmentName,
        assignmentDetail: req.body.assignmentDetail,
        file: req.body.file,
        assignmentType: req.body.assignmentType,
        points: req.body.points,
        dueDate: req.body.dueDate,
        createDate: Date.now()
      };
      course.assignments.unshift(newAssignment);
      course
        .save()
        .then(course => res.json({ success: course }))
        .catch(err => res.json({ message: err }));
    }
  });
});

//Anouncements
//get announcements
route.get("/:id/Announcements", function(req, res) {
  console.log("courseId:" + req.params.id);
  Course.findById(req.params.id)
    .then(course => {
      console.log("announcements:" + course.announcements);
      res.status(200).json(course.announcements);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

//file route
route.post("/:id/file", (req, res, next) => {
  console.log(req.files.lecturefile.name);
  let uploadFile = req.files.lecturefile;
  const fileName = req.files.lecturefile.name;
  // const fileNameSplit = req.files.file.name.split(".");
  //const ext = fileNameSplit[fileNameSplit.length - 1];
  //const fileName = `${req.user.id}.${ext}`;
  console.log("reqparams:" + req.params.id);
  console.log(fileName);
  console.log(uploadFile);
  uploadFile.mv(`${__dirname}/../public/files/uploads/${fileName}`, function(
    err
  ) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log("path:" + `${__dirname}/../public/files/${fileName}`);
    /* res.json({
      file: `public/${req.files.lecturefile.name}`
    }); */
  });
  Course.findById(req.params.id)
    .then(course => {
      console.log("files" + course.files);
      course.files.push(fileName);
      course
        .save()
        .then(course => res.json({ success: course }))
        .catch(err => res.json({ message: err }));
    })
    .catch(err => {
      console.log(err);
    });
});

route.get("/:id/file", (req, res) => {
  console.log("courseId:" + req.params.id);
  Course.findById(req.params.id)
    .then(course => {
      console.log(course.files);
      res.status(200).json(course.files);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});
module.exports = route;
