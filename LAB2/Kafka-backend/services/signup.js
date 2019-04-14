var db = require("../../Backend-code/database/db");
var User = require("../../Backend-code/models/User");
var bcrypt = require("bcrypt-nodejs");
const gravatar = require("gravatar");
const mongoose = require("mongoose");
function handle_request(msg, callback) {
  console.log("Inside  Kafka Backend signup");
  console.log("Message", msg);
  console.log("message email:" + msg.email);
  User.findOne(
    {
      email: msg.email
    },
    (err, user) => {
      if (err) {
        console.log("Unable to fetch user details.", err);
        callback(err, null);
      } else {
        if (user) {
          console.log("Duplicate user");
          callback(null, null);
        } else {
          const avatar = gravatar.url(msg.email, {
            s: "200", //size
            r: "pg", //rating
            d: "mm" //default
          });

          //Hashing Password!
          const hashedPassword = bcrypt.hashSync(msg.password);

          var user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: msg.name,
            email: msg.email,
            type: msg.type,
            avatar,
            password: hashedPassword
          });

          user.save().then(
            doc => {
              console.log("User saved successfully.", doc);
              callback(null, doc);
            },
            err => {
              console.log("Unable to save user details.", err);
              callback(err, null);
            }
          );
        }
      }
    }
  );
}
exports.handle_request = handle_request;
