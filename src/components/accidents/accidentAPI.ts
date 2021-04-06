import { Router, Request, Response } from 'express';
import path from 'path';
import { createReadStream, stat } from 'fs';
import { promisify } from 'util';
import { AccidentQuery } from './AccidentQuery';
import accidentService from './accidentService';

const fileName =`${path.join(__dirname, '../../../uploads/get_accidents-json-all.json')}`
const fileInfo = promisify(stat);

const route = Router();

const accidentRoute = (app: Router) => {
  app.use('/api/v1/accident', route);

  // get list of accidets aggregate a filter by query body, return deteail projection
  route.get('/', async (req, res) => {
    const queryObject: AccidentQuery = req.query;
    if (accidentService.isAllFiltr(queryObject)) {
      getAllFromFile(res);
    } else {
      const doc = await accidentService.get_list(queryObject);
      return res.json(doc);
    }

  });

  const getAllFromFile = async (res :Response) => {
    const { size } = await fileInfo(fileName);
    res.writeHead(200, {
        'Content-Length': size,
        'Content-Type': 'application/json; charset=utf-8'
    });
    createReadStream(fileName).pipe(res).on('error', console.error);
  };

 // get list of accidets aggregate a filter by query body, return deteail projection
 route.get('/all', (req, res) => getAllFromFile(res));

  // count accidents by query query
  route.get('/count/', async (req, res) => {
    const queryObject = req.query;
    const doc = await accidentService.count_get(queryObject);
    return res.json(doc);
  });

  // filter+ group accidents by query
  route.get('/groupby/', async (req, res) => {
    const queryObject = req.query;
    const doc = await accidentService.getGroupBy(queryObject);
    return res.json(doc);
  });

  route.get('/test', (req: Request, res: Response) => {
    return res.json({ user: 'mosh' }).status(200);
  });
};

export default accidentRoute;

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

