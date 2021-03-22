const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// import * as cors from 'cors';
const logger = require('../middlewares/logger');
const usersRoute = require('../routes/users');
const hazardRoue = require('../routes/hazards');
const accidentRoute = require('../components/accidents/accidentAPI');
const cityRoute = require('../routes/city');
const imgRoute = require('../routes/images');

const expressLoader = async ({ app }) => {
  app.use(express.static(path.join(__dirname, 'uploads')));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    logger.info(`${new Date().toString()} => ${req.originalUrl}:`, req.body);
    next();
  });
  // get react static files
  app.use(express.static(path.join(__dirname, 'build')));
  app.use('/api/v1/users', usersRoute);
  app.use('/api/v1/hazards', hazardRoue);
  app.use('/api/v1/accident', accidentRoute);
  app.use('/api/v1/city', cityRoute);
  app.use('/api/v1/img', imgRoute);
  // if not find - navigate in react
  app.use(express.static(path.join(__dirname, '../../build')));
  app.use(express.static(path.join(__dirname, '../../build/static')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });

  app.use((req, res) => {
    logger.info(`404 - ${req.originalUrl}`, req.body);
    res.status(404).send('The url you requested cannot be found.');
  });
  app.use((error, req, res, next) => {
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

module.exports = expressLoader;
