var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var methodOverride = require('express-method-override');
var port = process.env.PORT || 3001
app.use(methodOverride('_method'));
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

var Users = require('./routes/Users')
var courses = require('./routes/courses')
var permissonNumber = require('./routes/permissonNumber')
var enrollment = require('./routes/enrollment')
var grades = require('./routes/grades')
app.use('/users', Users)
app.use('/courses', courses)
app.use('/permissonNumber', permissonNumber)
app.use('/enrollment', enrollment)
app.use('/users/courses/grades', grades)
app.listen(port, () => {
    console.log("Server is running on port: " + port)
})