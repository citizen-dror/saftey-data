const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const ImgModel = require('../models/images.model');
const logger = require('../middlewares/logger');

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


const fetchImageFromDb = async (filename) => {
  try {
    const file = await ImgModel.findOne({ filename }).exec();
    if (!file || file.length === 0) {
      return (404); // 'No file exists'
    }
    if (file.contentType !== 'image/png' && file.contentType !== 'image/jpeg') {
      logger.info('404 - Not an image');
      return (404);
    }
    // logger.log(file.filename);
    const fileName = `./uploads/${file.filename}`;
    fs.writeFileSync(fileName, file.data);
    return (200);
  } catch (err) {
    return 500;
  }
};

const prepareImages = async (array) => {
  array.forEach((element) => {
    const filePath = `./uploads/${element.filename}`;
    fs.access(filePath, fs.F_OK, async (err) => {
      if (err) {
        fetchImageFromDb(element.filename);
      }
    });
  });
  return null;
};

const countImages = async (query) => {
  try {
    const count = await ImgModel.countDocuments(query).exec();
    return count;
  } catch (error) {
    return -1;
  }
};

const getProjectionByLang = (lang) => {
  let projection = null;
  let progLang = null;
  if (lang === '') projection = { data: 0 };
  else {
    const baseProjection = {
      _id: 1, filename: 1, contentType: 1, place: 1, tags: 1, index: 1, createdAt: 1,
    };
    if (lang === 'he') progLang = { titlehe: 1, texthe: 1 };
    else if (lang === 'en') progLang = { titleen: 1, texten: 1 };
    else progLang = { titlear: 1, textar: 1 };
    projection = { ...baseProjection, ...progLang };
  }
  return projection;
};

// const handleError = (res, err) => {
//   logger.log(err);
//   return res.status(500).jsonp(err);
// };

// router.post('/', upload.single('image'), (req, res, next) => {
//   if (!req.body) {
//     return res.status(400).send('request boddy is missing!');
//   }
//   // logger.log(req.body.title)
//   logger.log(req.file.originalname);
//   // logger.log(req.file)
//   const newImg = new ImgModel();
//   newImg.filename = req.file.originalname;
//   newImg.contentType = req.file.mimetype;
//   newImg.titlehe = req.body.titlehe;
//   newImg.texthe = req.body.texthe;
//   newImg.titleen = req.body.titleen;
//   newImg.texten = req.body.texten;
//   newImg.titlear = req.body.titlear;
//   newImg.textar = req.body.textar;
//   newImg.place = req.body.place;
//   newImg.index = req.body.index;
//   newImg.tags = req.body.tags.split(',');
//   newImg.data = fs.readFileSync(`./uploads/${req.file.originalname}`);
//   newImg.save((err) => {
//     if (err) {
//       next(err); // Pass errors to Express.
//     } else {
//       return res.send(`got image ${req.file.originalname}`);
//     }
//   });
//   return true;
// });

// router.put('/props/', async (req, res) => {
//   if (!req.body) {
//     return res.status(400).send('request boddy is missing!');
//   }
//   // logger.log(req.body.title)
//   logger.log(req.body.filename);
//   const filter = { filename: req.body.filename };
//   const update = {
//     titlehe: req.body.titlehe,
//     texthe: req.body.texthe,
//     titleen: req.body.titleen,
//     texten: req.body.texten,
//     titlear: req.body.titlear,
//     textar: req.body.textar,
//     place: req.body.place,
//     tags: req.body.tags,
//     index: req.body.index,
//   };
//   // `doc` is the document _after_ `update` was applied because of
//   // `new: true`
//   await ImgModel.findOneAndUpdate(filter, update, {
//     new: true,
//   });
//   // remove data from return answer to make it lighter
//   return res.status(200).jsonp('ok');
// });

// router.put('/', upload.single('image'), async (req, res) => {
//   if (!req.body) {
//     return res.status(400).send('request boddy is missing!');
//   }
//   // logger.log(req.body.title)
//   logger.log(req.file.originalname);
//   const filter = { filename: req.file.originalname };
//   const update = {
//     titlehe: req.body.titlehe,
//     texthe: req.body.texthe,
//     titleen: req.body.titleen,
//     texten: req.body.texten,
//     titlear: req.body.titlear,
//     textar: req.body.textar,
//     place: req.body.place,
//     tags: JSON.parse(req.body.tags),
//     data: fs.readFileSync(`./uploads/${req.file.originalname}`),
//   };
//   // `doc` is the document _after_ `update` was applied because of
//   // `new: true`
//   const doc = await ImgModel.findOneAndUpdate(filter, update, {
//     new: true,
//   });
//   // remove data from return answer to make it lighter
//   delete doc.data;
//   return res.status(200).jsonp(doc);
// });

router.get('/tags/:lang/:tag', (req, res) => {
  const { lang, tag } = req.params;
  const projection = getProjectionByLang(lang);
  const cond = { tags: tag };
  ImgModel.find(cond, projection).sort({ index: 1 })
    .then((doc) => {
      prepareImages(doc);
      return res.jsonp(doc);
    })
    .catch((err) => res.status(500).jsonp(err));
  return true;
});

router.get('/tags/:tag', (req, res) => {
  const { tag } = req.params;
  const projection = getProjectionByLang('');
  const cond = { tags: tag };
  ImgModel.find(cond, projection).sort({ index: 1 })
    .then((doc) => {
      prepareImages(doc);
      return res.jsonp(doc);
    })
    .catch((err) => res.status(500).jsonp(err));
  return true;
});


router.get('/place/:lang/:city', (req, res) => {
  const { lang, city } = req.params;
  const projection = getProjectionByLang(lang);
  const cond = { place: city };
  ImgModel.find(cond, projection)
    .then((doc) => {
      prepareImages(doc);
      res.jsonp(doc);
    })
    .catch((err) => res.status(500).jsonp(err));
  return true;
});

router.get('/count/', async (req, res) => {
  const count = await countImages({});
  if (count >= 0) {
    return res.status(200).json({ count });
  }
  return res.status(500).json('error');
});

router.get('/:filename', async (req, res) => {
  const filePath = `./uploads/${req.params.filename}`;
  let foundFile = true;
  await fs.access(filePath, fs.F_OK, async (err) => {
    if (err) {
      foundFile = false;
      await fetchImageFromDb(req.params.filename)
        .then(((status) => {
          if (status === 200) {
            return res.sendFile(path.join(__dirname, '../../uploads', req.params.filename));
          } if (status === 404) {
            return res.status(status).json({
              err: 'No file exists',
            });
          } return res.status(500).json('error');
        }));
      // file exists
    }
    if (foundFile) return res.sendFile(path.join(__dirname, '../../uploads', req.params.filename));
  });
});

module.exports = router;
