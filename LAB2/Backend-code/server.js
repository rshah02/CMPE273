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
const Users = require("./routes/Users");

const profile = require("./routes/profile");
const Courses = require("./routes/courses");
const enrollment = require("./routes/enrollment");
var permissonNumber = require("./routes/permissonNumber");

//const Announcements = require("./routes/announcements");
//const file = require("./routes/file");
//const fileUpdload = require("express-fileupload");
//passport Middleware
require("./middlewares/passport")(passport);

app.use(passport.initialize());

app.use(express.static(__dirname + "/public"));
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
app.use("/permissonNumber", permissonNumber);

//app.use("/courses/:id/file", file);
//app.use("/users/courses/:id/Announcements", Announcements);
//app.use("/file", file);
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
