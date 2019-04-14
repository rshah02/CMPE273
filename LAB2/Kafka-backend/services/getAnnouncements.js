var Course = require("../../Backend-code/models/Course");

function handle_request(msg, callback) {
  //  / console.log("email:" + req.body.email);
  console.log("inside kafka get Announcement");
  const id = msg.id;
  console.log("message email:" + id);
  Course.findById(msg.id)
    .then(Course => {
      console.log("announcements:" + Course.announcements);
      callback(null, Course.announcements);
    })
    .catch(err => {
      console.log("err" + err);
      callback(err, null);
    });
}

exports.handle_request = handle_request;
