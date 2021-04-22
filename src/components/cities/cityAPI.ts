import { Router, Request, Response } from 'express';

import cityService from './cityService';

const router = Router();

const cityRoute = (app: Router) => {
  app.use('/api/v1/city', router);

  //controlers
  router.get('/', async (req, res) => {
    const queryObject: any = req.query;
    const doc = await cityService.getCity(queryObject);
    return res.json(doc);
  });
}

export default cityRoute;