const mysql = require("mysql");
var con = require("../database/db");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const User = require("../models/User");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log("hello");
      console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          console.log(err);
        });
      /* const sql = "Select * from users where userId=" + jwt_payload.userId;
      con.query(sql, (err, results) => {
        if (results) {
          return done(null, results);
        }
        return done(null, false);
      }); */
    })
  );
};
