"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service = require('./accidentService');
const route = express_1.Router();
const accidentRoute = (app) => {
    app.use('/api/v1/accident', route);
    // get list of accidets aggregate a filter by query body, return deteail projection
    route.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const queryObject = req.query;
        const doc = yield service.accident_get(queryObject);
        return res.json(doc);
    }));
    // count accidents by query query
    route.get('/count/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const queryObject = req.query;
        const doc = yield service.accident_count_get(queryObject);
        return res.json(doc);
    }));
    // filter+ group accidents by query
    route.get('/groupby/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const queryObject = req.query;
        const doc = yield service.accident_getGroupBy(queryObject);
        return res.json(doc);
    }));
    route.get('/test', (req, res) => {
        return res.json({ user: 'mosh' }).status(200);
    });
};
exports.default = accidentRoute;
// // count accidents by query body
// router.post('/count', async (req, res) => {
//   const query = req.body;
//   const doc = await service.accident_count(query);
//   return res.json(doc);
// });
// // filter+ group accidents by query body
// router.post('/agg', async (req, res) => {
//   const query = req.body;
//   const doc = await service.accident_GroupBy_post(query);
//   return res.json(doc);
// });
// // get list of accidets aggregate a filter by query body, return deteail projection
// router.post('/aggmain', async (req, res) => {
//   const query = req.body;
//   const doc = await service.accident_getList(query, 'main');
//   return res.json(doc);
// });
// // get list of accidets aggregate a filter by query body, return lat-lon projection
// router.post('/agglatlon', async (req, res) => {
//   const query = req.body;
//   const doc = await service.accident_getList(query, 'latlon');
//   return res.json(doc);
// });
// // aggregate by filter by post
// router.post('/agglatlon', controller.accident_getList);
// find accident by post
// router.post('/', (req, res, next) => { controller(req, res, next, 'all'); });
// router.post('/latlon', (req, res, next) => { controller(req, res, next, 'latlon'); });
// router.post('/main', (req, res, next) => { controller(req, res, next, 'main'); });
//# sourceMappingURL=accidentAPI.js.map