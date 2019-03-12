/*module.exports =
    [{
    "username": "admin",
    "password": "admin"
}]*/

/*const Sequelize=require("sequelize");
const db={}
const sequelize=new Sequelize("Canvas","root","",{
    host:'localhost',
    dialect:'mysql',
    operatorsAliases:false,
    pool:{
        max: 5,
        min:0,
        acquire:30000,
        idle:10000
    }
})

db.sequelize=sequelize
db.Sequelize=Sequelize */
var mysql = require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'canvas'
});

db.connect(function (err) {
    if (err) throw err;
    console.log("connected");
})
module.exports = db;