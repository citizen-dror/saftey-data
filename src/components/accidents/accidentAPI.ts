const express = require('express');
// const url = require('url');
const service = require('./accidentService');
// const cache = require('../../middlewares/cache');

const router = express.Router();
// const isUseCache = false;

// count accidents by query body
router.post('/count', async (req, res) => {
  const query = req.body;
  const doc = await service.accident_count(query);
  return res.json(doc);
});

// filter+ group accidents by query body
router.post('/agg', async (req, res) => {
  const query = req.body;
  const doc = await service.accident_GroupBy_post(query);
  return res.json(doc);
});

// get list of accidets aggregate a filter by query body, return deteail projection
router.post('/aggmain', async (req, res) => {
  const query = req.body;
  const doc = await service.accident_getList(query, 'main');
  return res.json(doc);
});

// get list of accidets aggregate a filter by query body, return lat-lon projection
router.post('/agglatlon', async (req, res) => {
  const query = req.body;
  const doc = await service.accident_getList(query, 'latlon');
  return res.json(doc);
});

// get list of accidets aggregate a filter by query body, return deteail projection
router.get('/', async (req, res) => {
  const queryObject = req.query;
  const doc = await service.accident_get(queryObject);
  return res.json(doc);
});

// count accidents by query query
router.get('/count/', async (req, res) => {
  const queryObject = req.query;
  const doc = await service.accident_count_get(queryObject);
  return res.json(doc);
});

// filter+ group accidents by query
router.get('/groupby/', async (req, res) => {
  const queryObject = req.query;
  const doc = await service.accident_getGroupBy(queryObject);
  return res.json(doc);
});

// // aggregate by filter by post
// router.post('/agglatlon', controller.accident_getList);
// find accident by post
// router.post('/', (req, res, next) => { controller(req, res, next, 'all'); });
// router.post('/latlon', (req, res, next) => { controller(req, res, next, 'latlon'); });
// router.post('/main', (req, res, next) => { controller(req, res, next, 'main'); });

module.exports = router;
