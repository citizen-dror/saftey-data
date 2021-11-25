import { Router, Request, Response } from 'express';
import cityService from './cityService';

const route = Router();

const cityRoute = (app: Router) => {
  app.use('/api/v1/city', route);

  //controlers
  route.get('/', async (req, res) => {
    const queryObject: any = req.query;
    const doc = await cityService.getCity(queryObject);
    return res.json(doc);
  });

  route.get('/test', (req: Request, res: Response) => {
    return res.json({ test: 'test-city' }).status(200);
  });
}

export default cityRoute;