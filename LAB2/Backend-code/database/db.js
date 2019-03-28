var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "canvas"
});

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/Canvas")
  .then(() => console.log("Mongo connected"))
  .catch(err => console.log(err));

/*var db = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'canvas'
})*/
/*db.getConnection(function (err) {
    if (err) throw err;
    console.log("connected")
})*/

db.connect(function(err) {
  if (err) throw err;
  console.log("connected");
});
module.exports = db;
