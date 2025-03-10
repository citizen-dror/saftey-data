import expressLoader from './expressLoader';
import rateLimitLoader from './rateLimitLoader';
import helmetLoader from './helmetLoader';
import corsLoder from './corsLoader';
const {connect} = require('../database1');
// import mongooseLoader from './mongoose';
import logger from '../middlewares/logger';

const loader = async ({ expressApp }) => {
  await corsLoder({app: expressApp});
  logger.info('cors Loader Initialized');

  await helmetLoader({ app: expressApp });
  logger.info('helmet Loader Initialized');

  await rateLimitLoader({ app: expressApp });
  logger.info('rate limit Initialized');

  // const mongoConnection = await mongooseLoader();
  // eslint-disable-next-line no-unused-vars
  await connect();
  logger.info('MongoDB Initialized');

  await expressLoader({ app: expressApp });
  logger.info('Express Initialized');

  // ... more loaders can be here
};

export default loader;
