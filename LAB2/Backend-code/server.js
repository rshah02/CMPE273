var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
const passport = require("passport");
//var methodOverride = require("express-method-override");
var port = process.env.PORT || 3001;
//app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const Users = require("./routes/Users");

const profile = require("./routes/profile");
const Courses = require("./routes/courses");
var enrollment = require("./routes/enrollment");
//passport Middleware
require("./middlewares/passport")(passport);

app.use(passport.initialize());

//authentication middlware for passport

//Routes

/*var courses = require('./routes/courses')
var permissonNumber = require('./routes/permissonNumber')
var enrollment = require('./routes/enrollment')
var grades = require('./routes/grades')

app.use('/courses', courses)
app.use('/permissonNumber', permissonNumber)
app.use('/enrollment', enrollment)
app.use('/users/courses/grades', grades) */

app.use("/users", Users);
app.use("/users/profile", profile);
app.use("/users/courses", Courses);
app.use("/enrollment", enrollment);
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
