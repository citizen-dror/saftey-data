import express, { Router, Request, Response } from 'express';
import path from 'path';
import { createReadStream, stat } from 'fs';
import { promisify } from 'util';
import IAccidentQuery  from '../models/iAccidentQuery';
import accidentService from '../service/accidentService';
import accidentDAL from '../dal/accidentDAL';

const fileName =`${path.join(__dirname, '../../../uploads/get_accidents-json-all.json')}`
const fileInfo = promisify(stat);

const router = Router(); 

const accidentRoute = (app:express.Application) => {
  app.use('/api/v1/accident', router);
  const service = new accidentService(accidentDAL); 
  
  // get list of accidets aggregate a filter by query body, return deteail projection
  router.get('/', async (req:Request, res:Response) => {
    const queryObject: IAccidentQuery = req.query;
    //if (service.isAllFiltr(queryObject)) {
      //getAllFromFile(res);
    //} else {
      const doc = await service.get_list(queryObject);
      return res.json(doc);
    //}
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
 router.get('/all', (req, res) => getAllFromFile(res));

  // count accidents by query query
  router.get('/count/', async (req, res) => {
    const queryObject = req.query;
    const doc = await service.count_get(queryObject);
    return res.json(doc);
  });

  // filter+ group accidents by query
  router.get('/groupby/', async (req, res) => {
    const queryObject = req.query;
    const doc = await service.getGroupBy(queryObject);
    return res.json(doc);
  });

  // Add a health check route in express
  router.get('/health', (req, res) => {
    res.status(200).send('ok');
  })

  router.get('/test', (req: Request, res: Response) => { 
    return res.json({ user: 'mosh' });
  });
};

export default accidentRoute;
