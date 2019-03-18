var mysql = require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'canvas'
});

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

db.connect(function (err) {
    if (err) throw err;
    console.log("connected");
})
module.exports = db;