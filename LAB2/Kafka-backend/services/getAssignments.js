var Course = require("../../Backend-code/models/Course");

function handle_request(msg, callback) {
  //  / console.log("email:" + req.body.email);
  console.log("inside kafka get Assignments");
  console.log("msg id:" + msg.id);

  Course.findById(msg.id)
    .then(course => {
      callback(null, course.assignments);
    })
    .catch(err => {
      callback(err, null);
    });
}

exports.handle_request = handle_request;
