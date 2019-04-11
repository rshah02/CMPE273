var db = require("../../Backend-code/database/db");
var User = require("../../Backend-code/models/User");
var bcrypt = require("bcrypt-nodejs");

function handle_request(msg, callback) {
  //  / console.log("email:" + req.body.email);
  console.log("inside kafka get profile");
  const email = msg.email;
  console.log("message email:" + email);
  User.findOne({ email: msg.email })
    .then(user => {
      console.log(user);
      callback(null, user);
    })
    .catch(err => {
      console.log("err" + err);
      callback(err, null);
    });
}

exports.handle_request = handle_request;
