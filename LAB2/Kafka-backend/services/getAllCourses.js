var db = require("../../Backend-code/database/db");
var Course = require("../../Backend-code/models/Course");
var bcrypt = require("bcrypt-nodejs");

function handle_request(msg, callback) {
  //  / console.log("email:" + req.body.email);
  console.log("inside kafka get All Users");
  Course.find()
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
