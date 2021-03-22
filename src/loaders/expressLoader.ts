import express, { Request, Response } from 'express';
import path from 'path';
// import bodyParser from 'body-parser';

// import * as cors from 'cors';
import imageRoute from '../components/images/imagesAPI';
import accidentRoute from '../components/accidents/accidentAPI';
import logger from '../middlewares/logger';

const expressLoader = async ({ app }) => {

  app.use((req: Request, res: Response, next: any) => {
    logger.info(`${new Date().toString()} => ${req.originalUrl}:`, req.body);
    next();
  });

  accidentRoute(app);
  imageRoute(app);

  // if not find - navigate in react
  app.use(express.static(path.join(__dirname, '../../build')));
  app.use(express.static(path.join(__dirname, '../../build/static')));
  app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });

  app.use((req: Request, res: Response) => {
    logger.info(`404 - ${req.originalUrl}`, req.body);
    res.status(404).send('The url you requested cannot be found.');
  });
  app.use((error: any, req: Request, res: Response, next: any) => {
    if (res.headersSent) {
      return next(error);
    }
    logger.error(error.stack);
    return res.status(500).send('Unknown Error in the server');
  });
  // ...More middlewares

  // Return the express app
  return app;
};

export default expressLoader;
