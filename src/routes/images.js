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

// const handleError = (res, err) => {
//   console.log(err);
//   return res.status(500).jsonp(err);
// };

router.post('/', upload.single('image'), (req, res, next) => {
  if (!req.body) {
    return res.status(400).send('request boddy is missing!');
  }
  // console.log(req.body.title)
  console.log(req.file.originalname);
  // console.log(req.file)
  const newImg = new ImgModel();
  newImg.filename = req.file.originalname;
  newImg.contentType = req.file.mimetype;
  newImg.titlehe = req.body.titlehe;
  newImg.texthe = req.body.texthe;
  newImg.titleen = req.body.titleen;
  newImg.texten = req.body.texten;
  newImg.titlear = req.body.titlear;
  newImg.textar = req.body.textar;
  newImg.place = req.body.place;
  newImg.tags = JSON.parse(req.body.tags);
  newImg.data = fs.readFileSync(`./uploads/${req.file.originalname}`);
  newImg.save((err) => {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      return res.send(`got image ${req.file.originalname}`);
    }
  });
  return true;
});

router.put('/', upload.single('image'), async (req, res) => {
  if (!req.body) {
    return res.status(400).send('request boddy is missing!');
  }
  // console.log(req.body.title)
  console.log(req.file.originalname);
  const filter = { filename: req.file.originalname };
  const update = {
    titlehe: req.body.titlehe,
    texthe: req.body.texthe,
    titleen: req.body.titleen,
    texten: req.body.texten,
    titlear: req.body.titlear,
    textar: req.body.textar,
    place: req.body.place,
    tags: JSON.parse(req.body.tags),
    data: fs.readFileSync(`./uploads/${req.file.originalname}`),
  };
  // `doc` is the document _after_ `update` was applied because of
  // `new: true`
  const doc = await ImgModel.findOneAndUpdate(filter, update, {
    new: true,
  });
  // remove data from return answer to make it lighter
  delete doc.data;
  return res.status(200).jsonp(doc);
});

const getProjectionByLang = (lang) => {
  let projection = null;
  let progLang = null;
  const baseProjection = {
    _id: 1, filename: 1, contentType: 1, place: 1, tags: 1, createdAt: 1,
  };
  if (lang === 'he') progLang = { titlehe: 1, texthe: 1 };
  else if (lang === 'en') progLang = { titleen: 1, texten: 1 };
  else progLang = { titlear: 1, textar: 1 };
  projection = { ...baseProjection, ...progLang };
  return projection;
};

router.get('/tags/:lang/:tag', (req, res) => {
  const { lang, tag } = req.params;
  const projection = getProjectionByLang(lang);
  const cond = { tags: tag };
  ImgModel.find(cond, projection)
    .then((doc) => res.jsonp(doc))
    .catch((err) => res.status(500).jsonp(err));
  return true;
});

router.get('/place/:lang/:city', (req, res) => {
  const { lang, city } = req.params;
  const projection = getProjectionByLang(lang);
  const cond = { place: city };
  ImgModel.find(cond, projection)
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
