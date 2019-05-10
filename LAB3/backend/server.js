var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
const passport = require("passport");
var kafka = require("./kafka/client");
//var methodOverride = require("express-method-override");
var port = process.env.PORT || 3001;
//app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', 'http://ec2-18-223-153-77.us-east-2.compute.amazonaws.com:3000');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});
const Users = require("./routes/Users");

const profile = require("./routes/profile");
const Courses = require("./routes/courses");
const enrollment = require("./routes/enrollment");
const permissonNumber = require("./routes/permissonNumber");
const allCourses = require("./routes/allCourses");

//passport Middleware
require("./middlewares/passport")(passport);

app.use(passport.initialize());

app.use(express.static(__dirname + "/public"));
//authentication middlware for passport

//Routes

app.use("/users", Users);
app.use("/users/profile", profile);
app.use("/courses", allCourses);
app.use("/users/courses", Courses);
app.use("/enrollment", enrollment);
app.use("/permissonNumber", permissonNumber);
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
