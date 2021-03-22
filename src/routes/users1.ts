import { Router, Request, Response } from 'express';
const route = Router();

export default (app: Router) => {
  app.use('/api/v1/users', route);

  route.get('/test', (req: Request, res: Response) => {
    return res.json({ user: 'mosh' }).status(200);
  });
};
