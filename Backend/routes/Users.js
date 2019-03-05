const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

var User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/signup',(req, res) =>{
    const today = new Date()
    let userData = {
        name:req.body.name,
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

          User.findOne({
    where: {
        email: req.body.email
    }
})
    .then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                console.log(userData.password)
                User.create(userData)
                    .then(user => {
                        res.json({ status: user.email + ' registered' })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            })
        } else {
            res.json({ error: "User already exists" })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

users.post('/login',(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                let token=jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.json(user)
            }
        }else{
            res.status(400).json({error:'user does not exist'})
        }
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
})
module.exports = users