const expressLoader = require('./expressLoader');
const rateLimitLoader = require('./rateLimitLoader');
const helmetLoader = require('./helmetLoader');
// import mongooseLoader from './mongoose';
const logger = require('../middlewares/logger');

const loader = async ({ expressApp }) => {
  await helmetLoader({ app: expressApp });
  logger.info('helmet Loader Initialized');

  await rateLimitLoader({ app: expressApp });
  logger.info('rate limit Initialized');

  // const mongoConnection = await mongooseLoader();
  // eslint-disable-next-line no-unused-vars
  const db = require('../database');
  logger.info('MongoDB Initialized');

  await expressLoader({ app: expressApp });
  logger.info('Express Initialized');

  // ... more loaders can be here
};

module.exports = loader;
