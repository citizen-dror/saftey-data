const express = require('express');
const CityModel = require('../models/cities.model');

const router = express.Router();

const findFilterBylang = (req, res) => {
  let proj = {};
  // eslint-disable-next-line brace-style
  if (req.query.lang === 'he') { proj = { name_he: 1 }; }
  else if (req.query.lang === 'ar') proj = { name_ar: 1 };
  else { proj = { name_en: 1 }; }
  CityModel.find({}, proj)
    .then((doc) => res.jsonp(doc))
    .catch((err) => res.status(500).jsonp(err));
};

const findByNameHe = (req, res) => {
  CityModel.find({ name_he: req.query.name_he }, {})
    .then((doc) => res.jsonp(doc))
    .catch((err) => res.status(500).jsonp(err));
  return true;
};
const findByNameEn = (req, res) => {
  CityModel.find({ name_en: req.query.name_en }, {})
    .then((doc) => res.jsonp(doc))
    .catch((err) => res.status(500).jsonp(err));
  return true;
};

const findAll = (req, res) => {
  CityModel.find({}, {})
    .then((doc) => res.jsonp(doc))
    .catch((err) => res.status(500).jsonp(err));
};


// find city by post
router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send('request boddy is missing!');
  }
  CityModel.find(req.body, {})
    .then((doc) => res.jsonp(doc))
    .catch((err) => res.status(500).jsonp(err));
  return true;
});

// helper function to save json to json file
/* const saveAsfile = (jsonData) => {
  const fs = require('fs');
  fs.writeFile('test.txt', jsonData, (err) => {
    if (err) {
      logger.log(err);
    }
  });
}; */

// http://localhost:5000/api/v1/city
// http://localhost:5000/api/v1/city?name_he=חיפה
// http://localhost:5000/api/v1/city?name_en=Rehovot
// http://localhost:5000/api/v1/city?lang=he
router.get('/', (req, res) => {
  if (req.query.lang) {
    findFilterBylang(req, res);
  }
  if (req.query.name_he) {
    findByNameHe(req, res);
  } else if (req.query.name_en) {
    findByNameEn(req, res);
  } else {
    findAll(req, res);
  }
});

// http://localhost:3000/person/mike
router.get('/:name-he', (req, res) => {
  res.send(`you asked for city ${req.params.name}`);
});

module.exports = router;
