const express = require("express")
const route = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const con = require('../database/db')

route.get("/announcements", function (req, res) {

    const sql = "SELECT * FROM announcement WHERE courseId=" + mysql.escape(req.body.courseId);
    con.query(sql, (err, result) => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).send({ message: err })
        }
    })
})

route.post("/announcements", function (req, res) {
    const today = new Date();
    const sql = "INSERT INTO announcement (announcementTitle,courseId,announcemnetDetail,userId,announcemnetDate) VALUES (" + mysql.escape(req.body.announcementTitle) + "," +
        mysql.escape(req.body.courseId) + "," +
        mysql.escape(req.body.announcementDetail) + "," +
        mysql.escape(req.body.userId) + "," + today + ")";
    con.query(sql, (err, result) => {
        if (err) {
            res.status(400).send({ message: err })
        } else {
            res.status(200).send({ message: "announcement created" })
        }
    })
})

module.exports = route;