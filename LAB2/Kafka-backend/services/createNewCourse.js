var Course = require("../../Backend-code/models/Course");
const mongoose = require("mongoose");
function handle_request(msg, callback) {
  console.log("inside create new course");
  Course.findOne({ courseName: msg.courseName }).then(course => {
    if (course) {
      callback(null, null);
    } else {
      const newCourse = new Course({
        _id: new mongoose.Types.ObjectId(),
        courseName: msg.courseName,
        courseDept: msg.courseDept,
        courseTerm: msg.courseTerm,
        courseDescription: msg.courseTerm,
        courseRoom: msg.courseRoom,
        courseCapacity: msg.courseCapacity,
        waitlistCapacity: msg.courseCapacity,
        lectureTime: msg.lectureTime
      });
      newCourse
        .save()
        .then(course => {
          console.log(course);
          callback(null, course);
        })
        .catch(err => {
          console.log(err);
          callback(err, null);
        });
    }
  });
}
exports.handle_request = handle_request;
