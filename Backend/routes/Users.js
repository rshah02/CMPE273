const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const mysql = require('mysql')
var User = require("../models/User")
users.use(cors())
var con = require("../database/db")
process.env.SECRET_KEY = 'secret'
users.get('/', (req, res) => {
    var sql = "SELECT * FROM users ";
    con.query(sql, function (err, result) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'

            })
            res.end("invalid" + err);
        } else {
            res.json(result);
            res.end("success");
        }
    })
})
users.post('/signup', (req, res) => {
    const today = new Date()
    let userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        city: req.body.city,
        country: req.body.country,
        type: req.body.type,
        languages: req.body.languages,
        company: req.body.company,
        school: req.body.school,
        gender: req.body.gender,
        isActive: 1,
    }

    let password = req.body.password;
    /*   User.findOne({
               where: {
                   email: req.body.email
               }
           }) */
    let sql = "INSERT INTO users (name,email,password,type)VALUES(" + mysql.escape(req.body.name) + "," + mysql.escape(req.body.email) + "," + mysql.escape(password) + "," + mysql.escape(req.body.type) + ")";
    con.query(sql, function (err, result) {
        if (result) {
            res.json({
                status: "user registered"

            })

        } else {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("user already Exists" + err);
        }
    })

    /*   .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    console.log(userData.password)
                    User.create(userData)
                        .then(user => {
                            res.json({
                                status: user.email + ' registered'
                            })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({
                    error: "User already exists"
                })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })

                    res.send(token)
                }
            } else {
                res.status(400).json({
                    error: 'user does not exist'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        }) */
})

users.post('/profile', (req, res) => {

    User.update({
        name: req.body.name,
        city: req.body.city,
        country: req.body.country,
        languages: req.body.languages,
        school: req.body.school,
        company: req.body.company,
        phone: req.body.phone,


    }, {
        where: {
            email: req.body.email
        }
    })
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end("added");

})
module.exports = users