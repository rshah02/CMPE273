const express = require("express");
const route = express.Router();
const fileUpdload = require("express-fileupload");

route.use(
  fileUpdload({
    limits: { fileSize: 1 },
    useTempFiles: true,
    tempFileDir: `${__dirname}/../public/temp`,
    responseOnLimit: "File size limit has been reached"
  })
);

route.post("/public", (req, res, next) => {
  let uploadFile = req.files.file;
  const fileName = req.files.file.name;
  console.log(fileName);
  console.log(uploadFile);
  uploadFile.mv(`${__dirname}/../public/files/${fileName}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log("path:" + `${__dirname}/../public/files/${fileName}`);
    res.json({
      file: `public/${req.files.file.name}`
    });
  });
});

module.exports = route;
