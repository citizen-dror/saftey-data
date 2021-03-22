import expressLoader from './expressLoader';
import rateLimitLoader from './rateLimitLoader';
import helmetLoader from './helmetLoader';
// import mongooseLoader from './mongoose';
import logger from '../middlewares/logger';

const loader = async ({ expressApp }) => {
  await helmetLoader({ app: expressApp });
  logger.info('helmet Loader Initialized');

  await rateLimitLoader({ app: expressApp });
  logger.info('rate limit Initialized');

  // const mongoConnection = await mongooseLoader();
  // eslint-disable-next-line no-unused-vars
  const db = require('../database1');
  logger.info('MongoDB Initialized');

  await expressLoader({ app: expressApp });
  logger.info('Express Initialized');

  // ... more loaders can be here
};

export default loader;
