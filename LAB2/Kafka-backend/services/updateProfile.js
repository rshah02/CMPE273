var db = require("../../Backend-code/database/db");
var User = require("../../Backend-code/models/User");
var bcrypt = require("bcrypt-nodejs");

function handle_request(msg, callback) {
  //  / console.log("email:" + req.body.email);
  console.log("inside kafka update profile");

  const email = msg.email;

  console.log(req.body.email);
  console.log(req.body.city);
  User.findOneAndUpdate({ email: email }, msg, { new: true })
    .then(result => {
      console.log(result);
      callback(null, result);
    })
    .catch(err => {
      callback(err, null);
    });
}

exports.handle_request = handle_request;
