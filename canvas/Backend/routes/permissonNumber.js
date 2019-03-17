const express = require("express")
const route = express.Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql')
var con = require("../database/db")


route.get("/", (req, res) => {

    const sql = "SELECT waitlistCapacity FROM course WHERE courseId=" + mysql.escape(req.body.courseId);
    // const sql1 = "INSERT INTO waitlist(courseId,permissonnumber) VALUES (" + mysql.escape(req.body.courseId) + "," + mysql.escape(r) + ")";
    con.query(sql, (err, result) => {
        if (result) {
            console.log(result[0].waitlistCapacity);
            const waitlist = result[0].waitlistCapacity;
            for (i = 0; i < waitlist; i++) {
                let r = Math.floor(Math.random() * 100) + 1;
                const sql1 = "INSERT INTO permissonNumber(courseId,permissonNumber) VALUES (" + mysql.escape(req.body.courseId) + "," + mysql.escape(r) + ")";

                con.query(sql1, (err, result1) => {
                    if (result1) {


                    } else {
                        res.status(400).send(err)
                    }
                })

            }

        } else {
            res.status(400).send({ message: err })
        }
    })
})

module.exports = route