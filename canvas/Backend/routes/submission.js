const express = require("express")
const route = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql')
var con = require("../database/db")

route.post('/', (req, res) => {
    const date = new Date();
    const sql = "insert into submission(userId,courseId,assignmentId,submissionDetails,submissionDate)Values=(" +
        mysql.escape(req.body.userId) + "," +
        mysql.escape(req.body.courseId) + "," +
        mysql.escape(req.body.assignmentId) + ","
    mysql.escape(req.body.submissionDetails) + ","
    mysql.escape(date) + ")";

    con.query(sql, (err, result) => {
        if (result) {
            res.send({ status: "submitted succefully" })
        } else {
            res.status(400).send({ "message": err.sqlMessage })
        }
    })

})

route.get('/', (req, res) => {
    const sql = "select * from submission where assignmentId=" + mysql.escape(req.body.assignmentId);

    if (result) {
        res.status(200).json(result)
    } else {
        res.send({ "message": sqlMessage.err })
    }
})