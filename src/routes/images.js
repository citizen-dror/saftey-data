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
    console.log(req.body.title)
    console.log(req.file)
    //
    // const newImg = new imgModel();
    // newImg.img.data = fs.readFileSync(req.files.userPhoto.path)
    // newImg.img.contentType = 'image / png';
    // newImg.save();
    res.send(`got image ${req.body.name}`)
})
module.exports = router