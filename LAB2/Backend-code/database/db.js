var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "canvas"
});

const mongoose = require("mongoose");
//mongoose.Promise = global.Promise;
/*mongoose
  .connect("mongodb://localhost:27017/Canvas")
  .then(() => console.log("Mongo connected"))
  .catch(err => console.log(err)); 
*/
mongoose
  .connect(
    "mongodb+srv://Admin:admin@canvas-eg2ol.mongodb.net/Canvas?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongo connected"))
  .catch(err => console.log(err));

/*db.connect(function(err) {
  if (err) throw err;
  console.log("connected");
}); */
module.exports = db;
