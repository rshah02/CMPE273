const mysql = require("mysql");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
module.exports = passport => {
  console.log(passport);
  passport.use(
    new JwtStrategy(opts, (jwt_payload, next) => {
      console.log("hello");
      console.log(jwt_payload);
    })
  );
};
