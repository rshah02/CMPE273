var db = require("../../Backend-code/database/db");
var Course = require("../../Backend-code/models/Course");
var bcrypt = require("bcrypt-nodejs");
function handle_request(msg, callback) {
  console.log("inside new announcement");
  console.log("course id" + msg.params.id);
  Course.findById(msg.params.id).then(course => {
    const match = course.announcements.filter(
      announcement => announcement.announcementTitle === msg.announcementTitle
    );

    if (match.length !== 0) {
      callback(null, { message: "exists" });
    } else {
      const newAnnouncement = {
        announcementTitle: msg.announcementTitle,
        announcementDetails: msg.announcementDetails,
        announcementDate: Date.now()
      };
      course.announcements.push(newAnnouncement);
      course
        .save()
        .then(course => callback(null, course.announcements))
        .catch(err => callback(err, null));
    }
  });
}

exports.handle_request = handle_request;
