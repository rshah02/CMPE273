const express = require("express")
const route = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql')
var con = require("../database/db")
//all grades for one course and student 
route.get('/', function (req, res) {

    const sql = "SELECT * FROM submission s where s.userId=" + mysql.escape(req.body.userId) + " and s.courseId =" + mysql.escape(req.body.courseId);

    con.query(sql, function (err, result) {
        if (result) {
            res.status(200).json(result)
            console.log("result")
        }
        else {
            res.status(400).send({ message: err })
            console.log(err)
        }
    })

})


route.post('/', (req, res) => {
    const sql = "update submission set grades=" + mysql.escape(req.body.grades) +
        "where userId=" + mysql.escape(req.body.userId) +
        "and courseId=" + mysql.escape(req.body.courseId) +
        "and assignmentId=" + mysql.escape(req.body.assignmentId);
    con.query(sql, (err, result) => {
        if (result) {
            res.send({ status: "graded" })
        } else {
            res.status(400).send({ "message": err.sqlMessage })
        }
    })

})

module.exports = route