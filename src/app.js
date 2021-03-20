const express = require('express');
const loader = require('./loaders/index.js');
const logger = require('./middlewares/logger');
require('dotenv').config();

// Get port from environment and store in Express.
const port = process.env.PORT || 5000;

async function startServer() {
  const app = express();

  await loader({ expressApp: app });

  app.listen(port, () => {
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️
      ################################################
    `);
  }).on('error', (err) => {
    logger.error(err);
    process.exit(1);
  });
}

startServer();
