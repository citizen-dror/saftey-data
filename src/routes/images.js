const express = require('express');
let router = express.Router()
const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multer = require('multer');
const imgModel = require("../models/images.model");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });


router.post('/', upload.single('image'), (req, res, next) => {
    if (!req.body) {
        return res.status(400).send("request boddy is missing!")
    }
    //console.log(req.body.title)
    console.log(req.file.originalname)
    //console.log(req.file)
    const newImg = new imgModel();
    newImg.filename = req.file.originalname;
    newImg.contentType = req.file.mimetype;
    newImg.title = req.body.title;
    newImg.data = fs.readFileSync('./uploads/' + req.file.originalname)
    newImg.save();
    res.send(`got image ${req.file.originalname}`)
})

router.get('/:filename', (req, res) => {
    imgModel.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists',
        })
      }
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        //const readstream = gfs.createReadStream(file.filename)
        //readstream.pipe(res)
        try{
            fs.writeFileSync('./uploads/' + 'tmp-jsa-header.png', file.data) 
            //fs.writeFileSync(__dirname + '/static/assets/tmp/tmp-jsa-header.png', file.data);
            //console.log("Stored an image 'tmp-jsa-header.png' in '/static/assets/tmp' folder.");
            res.send(`got image ${file.filename}`)
          }catch(e){
            console.log(e);
          }

      } else {
        res.status(404).json({
          err: 'Not an image',
        })
      }
    })
  })

module.exports = router