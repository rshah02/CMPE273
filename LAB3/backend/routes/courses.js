const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/User");
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
//course details by id:
route.get("/:id", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Course.findById(req.params.id)

    .then(course => {
      res.status(200).json(course);
    })
    .catch(err => res.status(400).json({ message: err }));
});
//get all my the courses without authentication
route.get("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
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

//create new course kafka
route.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req:" + req.body);
    const abc = req.body;
    abc.params = req.user;
    console.log("passport user:" + abc.params);
    /*  kafka.make_request("createNewCourse", abc, function(err, result) {
      if (err) {
        res.status(500).json({ message: "error createing course" + err });
      } else {
        if (result) {
          res.status(200).json({ message: "course addded successfullu" });
        } else if (result == null) {
          res.status(400).json({ message: "course already exists" });
        }
      }
    }); */
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

//get assignments
route.get(
  "/:id/assignments",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    console.log("params:" + req.params.id);

    Course.findById(req.params.id)
      .then(course => {
        console.log("assignments:" + course.assignments);
        res.status(200).json(course.assignments);
      })
      .catch(err => {
        res.status(500).json({ message: err });
      });
  }
);

// create new announcement
route.post("/:id/Announcements", function(req, res) {
  console.log("called");

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
      console.log("called");
      let uploadFile = req.files.file;
      const fileName = req.files.file.name;
      console.log("filename:" + req.files.file.name);
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
          file: fileName,
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

//Anouncements kafka
//Create New Announcements
route.post("/:id/Announcements", function(req, res) {
  console.log("called");

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

//get announcements
route.get("/:id/Announcements", function(req, res) {
  console.log("=========");
  console.log(req.query.page);
  console.log("=========");
  Course.findById(req.params.id)
    .then(course => {
      console.log("announcements:" + course.announcements);
      res.status(200).json(course.announcements);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

//file routeupload
route.post("/:id/file", (req, res, next) => {
  console.log(req.files.lecturefile.name);
  let uploadFile = req.files.lecturefile;
  const fileName = req.files.lecturefile.name;

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
//file downlaoad
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

//submission
//get submission
route.get(
  "/:id/assignments/:asid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("courseId:" + req.params.id);
    Course.findById(req.params.id)
      .then(course => {
        r = course.submission.filter(as => as.assignmentId == req.params.asid);
        console.log(r);
        if (r.length > 0) {
          res.status(200).json(r);
        } else {
          res.status(400).json({ message: "no records found" });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);

//create submissiom
route.post(
  "/:id/assignments/:asid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("courseId:" + req.params.id);
    console.log("assignmentId:" + req.params.asid);
    let uploadFile = req.files.file;
    const fileName = req.files.file.name;
    console.log("filename:" + req.files.file.name);

    console.log("reqparams:" + req.params.id);
    console.log(fileName);
    console.log(uploadFile);
    uploadFile.mv(
      `${__dirname}/../public/files/submission/${fileName}`,
      function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        console.log(
          "path:" + `${__dirname}/../public/files/submission/${fileName}`
        );
      }
    );
    Course.findById(req.params.id)
      .then(course => {
        console.log(course.assignments[0]._id);
        const r = course.assignments.filter(as => as._id == req.params.asid);
        // debugger;
        //r.indexOf(req.params.asid)
        console.log(r);
        console.log(req.params.asid);
        if (r.length === 1) {
          newSubmission = {
            assignmentId: req.params.asid,
            submitfile: fileName,
            userId: req.user._id,
            comment: req.body.comment
          };
          course.submission.push(newSubmission);
          course
            .save()
            .then(course => res.status(200).json(course.submission))
            .catch(err => {
              console.log(err);
              res.status(400).json({ message: "resubmit" });
            });
          console.log("submitted:" + newSubmission);
        } else {
          console.log("not matched");
        }
      })
      .catch(err => console.log("error:" + err));
  }
);
//grades
route.post(
  "/:id/assi/grades",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const grade = {
      submissionId: req.body.submissionId,
      assignmentId: req.body.assignmentId,
      userId: req.body.userId,
      grade: req.body.grade
    };
    Course.findById(req.params.id)
      .then(course => {
        course.grade.push(grade);
        course
          .save()
          .then(coures => res.status(200).json({ message: "success" }))
          .catch(err => {
            res, status(400).json({ message: err });
          });
      })
      .catch(err => console.log(err));
  }
);
//submission
module.exports = route;
