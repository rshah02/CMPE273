const express = require("express")
const route = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql')
var con = require("../database/db")

route.get('/', function (req, res) {

    const sql = "SELECT * FROM course"

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
    const sql = "insert into course(courseId,courseName,courseDept,courseDescription,courseRoom,courseCapacity,waitlistCapacity,courseTerm,lectureTime) values (" +
        mysql.escape(req.body.courseId) + "," +
        mysql.escape(req.body.courseName) + "," +
        mysql.escape(req.body.courseDept) + "," +
        mysql.escape(req.body.courseDescription) + "," +
        mysql.escape(req.body.courseRoom) + "," +
        mysql.escape(req.body.courseCapacity) + "," +
        mysql.escape(req.body.waitlistCapacity) + "," +
        mysql.escape(req.body.courseTerm) + "," +
        mysql.escape(req.body.lectureTime) + ")";

    con.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ message: err })
        } else {
            res.status(200).json({ message: "course added successfully" })
        }
    })
})
route.get('/assignments', function (req, res) {
    const sql = "SELECT * FROM assignment WHERE courseId=" + mysql.escape(req.body.courseId) + " AND assignmentType='assignment'";
    con.query(sql, (err, result) => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json({ message: err })
        }
    })
})

route.post('/assignments', function (req, res) {
    const sql = "INSERT INTO assignment (assignmentTitle,assignmentDetail,courseId,assignmentType,points,dueDate) VALUES (" +
        mysql.escape(req.body.assignmentTitle) + "," +
        mysql.escape(req.body.assignmentDetail) + "," +
        mysql.escape(req.body.courseId) + "," +
        mysql.escape(req.body.assignmentType) + "," +
        mysql.escape(req.body.points) + "," +
        mysql.escape(req.body.dueDate) +
        ")";
    con.query(sql, (err, result) => {
        if (result) {
            res.send({ status: "assignemnt added" })
        } else {
            res.status(400).send({ message: err.sqlMessage })
        }
    })

})
module.exports = route;