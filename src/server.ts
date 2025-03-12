import express from 'express';
import bodyParser from 'body-parser';
import loader from './loaders/index';
import logger from './middlewares/logger';
import terminateLoader from './loaders/terminateLoader';
// import { models } from 'mongoose';
require('dotenv').config();

// Get port from environment and store in Express.
const port = process.env.PORT || 5000;

async function startServer() {
  const app = express();
  // bodyParser
  app.use(bodyParser.json());
  await loader({ expressApp: app });

  var srv = app.listen(port, () => {
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️
      ################################################
    `);
    // terminateLoader({server:server});
    // logger.info('treminate Loader Initialized');;
  }).on('error', (err) => {
    logger.error(err);
    process.exit(1);
  });

  return srv;
}

var server = startServer();
export default server;
