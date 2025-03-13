import expressLoader from './expressLoader';
import rateLimitLoader from './rateLimitLoader';
import helmetLoader from './helmetLoader';
import corsLoder from './corsLoader';
import authLoder from './authLoder';
const {connect} = require('../database1');
// import mongooseLoader from './mongoose';
import logger from '../middlewares/logger';

const loader = async ({ expressApp }) => {
  await corsLoder({ app: expressApp });
  logger.info('CORS Loader Initialized');

  await helmetLoader({ app: expressApp });
  logger.info('Helmet Loader Initialized');

  await rateLimitLoader({ app: expressApp });
  logger.info('Rate Limit Initialized');

  await expressLoader({ app: expressApp });
  logger.info('Express Initialized');

  //await authLoder({ app: expressApp }); // Moved here
  //logger.info('Auth Loader Initialized');

  await connect();
  logger.info('MongoDB Initialized');
};

export default loader;
