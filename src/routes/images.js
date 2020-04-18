const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const ImgModel = require('../models/images.model');

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const findImageInDb = (req, res, filename) => {
  ImgModel.findOne({ filename }, (err, file) => {
    // Check if file exists
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      // const readstream = gfs.createReadStream(file.filename)
      // readstream.pipe(res)
      try {
        const fileName = `./uploads/${file.filename}`;
        // const fileName = `../static/assets/tmp/${file.filename}`;
        fs.writeFileSync(fileName, file.data);
        return res.sendFile(path.join(__dirname, '../../uploads', file.filename));
        // return res.send(`got image ${file.filename}`);
      } catch (e) {
        console.log(e);
        return res.status(500).jsonp(e);
      }
    } else {
      return res.status(404).json({
        err: 'Not an image',
      });
    }
  });
};

router.post('/', upload.single('image'), (req, res) => {
  if (!req.body) {
    return res.status(400).send('request boddy is missing!');
  }
  // console.log(req.body.title)
  console.log(req.file.originalname);
  // console.log(req.file)
  const newImg = new ImgModel();
  newImg.filename = req.file.originalname;
  newImg.contentType = req.file.mimetype;
  newImg.title = req.body.title;
  newImg.tags = JSON.parse(req.body.tags);
  newImg.data = fs.readFileSync(`./uploads/${req.file.originalname}`);
  newImg.save();
  return res.send(`got image ${req.file.originalname}`);
});

router.get('/tags/:tag', (req, res) => {
  const cond = { tags: req.params.tag };
  ImgModel.find(cond, { data: 0 })
    .then((doc) => res.jsonp(doc))
    .catch((err) => res.status(500).jsonp(err));
  return true;
});

router.get('/:filename', (req, res) => {
  const filePath = `./uploads/${req.params.filename}`;
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      findImageInDb(req, res, req.params.filename);
    }
    // file exists
    return res.sendFile(path.join(__dirname, '../../uploads', req.params.filename));
  });
});

module.exports = router;
