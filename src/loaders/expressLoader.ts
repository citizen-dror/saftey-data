import express, { Request, Response } from 'express';
import path from 'path';
// import bodyParser from 'body-parser';

// import * as cors from 'cors';
import imageRoute from '../components/images/imagesAPI';
import accidentRoute from '../components/accidents/accidentAPI';
import morganMiddleware from './morganLoader';
import logger from '../middlewares/logger';
const addRequestId = require('express-request-id')();

function expressLoader({ app }) {

  app.use(addRequestId);
  app.use(morganMiddleware);

  accidentRoute(app);
  imageRoute(app);

  app.get("/api/v1/logger", (_, res) => {
    logger.error("This is an error log");
    logger.warn("This is a warn log");
    logger.info("This is a info log");
    logger.http("This is a http log");
    logger.debug("This is a debug log");

    res.send("Hello world");
  });

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
}

export default expressLoader;
