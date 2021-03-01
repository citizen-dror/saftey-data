const express = require('express');
const url = require('url');
const controller = require('./accidentController');
// const cache = require('../../middlewares/cache');

const router = express.Router();
// const isUseCache = false;

// count accidents by query body
router.post('/count', controller.accident_count);

// filter+ group accidents by query body
router.post('/agg', controller.accident_getGroupBy);

// get list of accidets aggregate a filter by query body, return deteail projection
router.post('/aggmain', (req, res) => {
  controller.accident_getList(req, res, 'main');
});

// get list of accidets aggregate a filter by query body, return lat-lon projection
router.post('/agglatlon', (req, res) => {
  controller.accident_getList(req, res, 'latlon');
});

// get list of accidets aggregate a filter by query body, return deteail projection
router.get('/', (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  controller.accident_get(req, res, queryObject);
});

// // aggregate by filter by post
// router.post('/agglatlon', controller.accident_getList);
// find accident by post
// router.post('/', (req, res, next) => { controller(req, res, next, 'all'); });
// router.post('/latlon', (req, res, next) => { controller(req, res, next, 'latlon'); });
// router.post('/main', (req, res, next) => { controller(req, res, next, 'main'); });

module.exports = router;
