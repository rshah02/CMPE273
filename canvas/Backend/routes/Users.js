const express = require("express")
const users = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql')
var con = require("../database/db")

users.post('/signup', (req, res) => {
    bcrypt.hash((req.body.password), 10, (err, hash) => {
        const sql = "INSERT INTO users (name,email,password,type)VALUES(" +
            mysql.escape(req.body.name) + "," +
            mysql.escape(req.body.email) + "," +
            mysql.escape(hash) + "," +
            mysql.escape(req.body.type) +
            ")";
        con.query(sql, function (err, result) {
            if (result) {
                res.send({
                    status: "user registered"
                })
            } else {
                res.status(400).send({
                    "message": err.sqlMessage
                });
            }
        })
    })
})

users.post('/profile', (req, res) => {
    let sql = "UPDATE users SET name=" + mysql.escape(req.body.name) +
        ",phone=" + mysql.escape(req.body.phone) +
        ",city=" + mysql.escape(req.body.city) +
        ",country=" + mysql.escape(req.body.country) +
        ",school=" + mysql.escape(req.body.school) +
        ",company=" + mysql.escape(req.body.company) +
        ",languages=" + mysql.escape(req.body.languages) +
        ",about=" + mysql.escape(req.body.about) +
        " WHERE email=" + mysql.escape(req.body.email);
    con.query(sql, function (err, result) {
        if (result) {
            res.send({
                message: "profile updated"
            })
        } else {
            console.log(err)
        }
    })
})

users.post("/login", (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    con.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, function (err, ress) {
                    if (!ress) {
                        res.json({
                            status: false,
                            message: "Email and password does not match"
                        });
                    } else {
                        res.json({
                            status: true,
                            message: "Successfully Login"
                        })
                    }
                });
            } else {
                res.json({
                    status: false,
                    message: "Email does not exits"
                });
            }
        }
    })

})

users.get("/courses", (req, res) => {

    const sql = "SELECT * from enrollment e,course c WHERE e.userId=" + mysql.escape(req.body.userId) + " AND e.courseId=c.courseId";
    con.query(sql, (err, results) => {
        if (results) {
            res.status(200).json(results)
            console.log(results)
        } else {
            res.status(400).json({ message: err })
        }
    })
})


module.exports = users