var db = require("../../Backend-code/database/db");
var User = require("../../Backend-code/models/User");
var bcrypt = require("bcrypt-nodejs");
//const gravatar = require("gravatar");
function handle_request(req, callback) {
  console.log("Inside  Kafka Backend signup");
  console.log("Message", req);
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      callback(null, null);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          throw err;
        }
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          type: req.body.type,
          avatar,
          password: hash
        });
        newUser
          .save()
          .then(user => callback(null, user))
          .catch(err => callback(err, null));
      });
    }
  });
}

exports.handle_request = handle_request;
