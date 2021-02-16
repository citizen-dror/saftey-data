const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const logger = require('./src/middlewares/logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const limitMainFilter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Too many accounts created from this IP, please try again after a minute',
});
const limitAll = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: 'Too many accounts created from this IP, please try again after a minute',
});

// Middlewares
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'img-src': ["'self'", '*.tile.openstreetmap.org', 'data:'],
    },
  }),
);
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
// app.use(helmet());
app.use('/api/v1/accident/aggmain', limitMainFilter);
app.use(limitAll);

// eslint-disable-next-line no-unused-vars
const db = require('./src/database');
const usersRoute = require('./src/routes/users');
const hazardRoue = require('./src/routes/hazards');
const accidentRoute = require('./src/routes/accident');
const cityRoute = require('./src/routes/city');
const imgRoute = require('./src/routes/images');

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
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
app.use(express.static(`${__dirname}/`));
app.use(express.static(path.join(__dirname, 'build/static')));
app.listen(PORT, () => logger.info(`Server has started on ${PORT}`));
