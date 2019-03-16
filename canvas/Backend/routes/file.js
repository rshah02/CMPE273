const express = require("express")
const route = express.Router()
const fileUpdload = require('express-fileupload')
const bcrypt = require('bcrypt')
const mysql = require('mysql')
route.use(fileUpdload())
route.use('/public', express.static(__dirname + '/public'))
route.post('/file', (req, res, next) => {
    let uploadFile = req.files.file
    const fileName = req.files.file.name
    uploadFile.mv(
        `${__dirname}/public/files/${fileName}`,
        function (err) {
            if (err) {
                return res.status(500).send(err)
            }

            res.json({
                file: `public/${req.files.file.name}`,
            })
        },
    )
})

module.exports = route;