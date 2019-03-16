const express = require("express")
const route = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql')
var con = require("../database/db")


route.get("/", function (req, res) {

    const sql = "SELECT waitlist FROM course WHERE courseId=" + mysql.escape(req.body.courseId);
    con.query(sql, (err, result) => {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).send({ message: err })
        }
    })
})

module.exports = route;