var express = require("express");

var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const passport = require("passport");
//var methodOverride = require("express-method-override");
var port = process.env.PORT || 3001;
//app.use(methodOverride("_method"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const mongoose = require("mongoose");

mongoose
  .connect(
    " mongodb+srv://Admin:admin@cluster0-eg2ol.mongodb.net/Canvas?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongo connected"))
  .catch(err => console.log(err));
//passport Middleware
require("./middlewares/passport")(passport);

app.use(passport.initialize());

app.use(express.static(__dirname + "/public"));
//authentication middlware for passport

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
//Routes

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
