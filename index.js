const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('./src/middlewares/logger');

const PORT = process.env.PORT || 5000;
const app = express();
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
  logger.info(`${new Date().toString()} => ${req.originalUrl}`, req.body);
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
app.use((err) => {
  logger.error(err.stack);
});
app.listen(PORT, () => logger.info(`Server has started on ${PORT}`));
