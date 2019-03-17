const express = require("express")
const route = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql')
var con = require("../database/db")

route.get("/", (req, res) => {

    const sql = "SELECT * from enrollment e,users u WHERE e.courseId=" + mysql.escape(req.body.courseId) + " AND e.userId=u.userId";

    con.query(sql, (err, result) => {
        if (err) {
            res.status(400).send({ message: err })
        } else {
            res.status(200).json(result);
        }

    })
})

route.post("/", (req, res) => {
    const sql = "select * from enrollment where userId=" + mysql.escape(req.body.userId) + "and courseId=" + mysql.escape(req.body.courseId);
    con.query(sql, (err, result) => {
        if (!result.length == 0) {
            res.json({ message: "already exists" })
        } else {

            const sql = "INSERT INTO enrollment(courseId,userId) values(" + mysql.escape(req.body.courseId) + "," + (req.body.userId) + ")";
            con.query(sql, (err, result) => {
                if (err) {
                    res.json({ mesasge: err })
                } else {
                    res.json({ message: "user added" })
                }
            })
        }
    })


})
route.delete("/", (req, res) => {
    const sql = "delete from enrollment where userId=" + mysql.escape(req.body.userId) + " and courseId=" + mysql.escape(req.body.courseId);
    con.query(sql, (err, result) => {
        if (err) {
            res.status(400).send(err)

        } else {
            res.status(400).json({ mesasge: "removed from course" })
        }
    })
})


module.exports = route