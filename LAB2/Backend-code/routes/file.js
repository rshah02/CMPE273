const express = require("express");
const route = express.Router();
const fileUpdload = require("express-fileupload");
const Course = require("../models/Course");
route.use(
  fileUpdload({
    limits: { fileSize: 1 },
    useTempFiles: true,
    tempFileDir: `${__dirname}/../public/temp`,
    responseOnLimit: "File size limit has been reached"
  })
);

route.post("/", (req, res, next) => {
  console.log(req.files.lecturefile.name);
  let uploadFile = req.files.lecturefile;
  const fileName = req.files.lecturefile.name;
  // const fileNameSplit = req.files.file.name.split(".");
  //const ext = fileNameSplit[fileNameSplit.length - 1];
  //const fileName = `${req.user.id}.${ext}`;
  console.log(req.params.id);
  console.log(fileName);
  console.log(uploadFile);
  Course.findById(req.params.id)
    .then(course => {
      course.files.push(fileName);
    })
    .catch(err => {
      console.log(err);
    });
  uploadFile.mv(`${__dirname}/../public/files/uploads/${fileName}`, function(
    err
  ) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log("path:" + `${__dirname}/../public/files/${fileName}`);
    res.json({
      file: `public/${req.files.lecturefile.name}`
    });
  });
});

module.exports = route;
