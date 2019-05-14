var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "canvas"
});

// const mongoose = require("mongoose");

// mongoose
//   .connect(
//     " mongodb+srv://Admin:admin@cluster0-eg2ol.mongodb.net/Canvas?retryWrites=true",
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log("Mongo connected"))
//   .catch(err => console.log(err));

module.exports = db;
