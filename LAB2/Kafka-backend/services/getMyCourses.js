var Course = require("../../Backend-code/models/Course");

function handle_request(msg, callback) {
  //  / console.log("email:" + req.body.email);
  console.log("inside kafka getMy Courses");
  console.log("msg id:" + msg._id);

  Course.find({ users: { _id: msg._id } })
    .then(result => {
      console.log(result);
      callback(null, result);
    })
    .catch(err => {
      console.log(err);
      callback(err, null);
    });
}

exports.handle_request = handle_request;
