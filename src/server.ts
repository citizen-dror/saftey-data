import express from 'express';
import loader from './loaders/index';
import logger from './middlewares/logger';
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

// import express, { Request, Response } from 'express';
// import path from 'path';
// require('dotenv').config();
// import usersRoute from './routes/users1'; 
// import imageRoute from './components/images/imagesAPI';
// import accidentRoute from './components/accidents/accidentAPI';
// import logger from './middlewares/logger';
// const db = require('./database1');

// const app = express();
// // Get port from environment and store in Express.
// const port = process.env.PORT || 5000;

// // define a route handler
// accidentRoute(app); 
// imageRoute(app);
// usersRoute(app);

// // if not find - navigate in react
// app.use(express.static(path.join(__dirname, '../build')));
// app.use(express.static(path.join(__dirname, '../build/static')));
// app.get('/*', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });

// app.use((req, res) => {
//   logger.info(`404 - ${req.originalUrl}`, req.body);
//   res.status(404).send('The url you requested cannot be found.');
// });
// app.use((error: any, req: Request, res: Response, next: any) => {
//   if (res.headersSent) {
//     return next(error);
//   }
//   logger.error(error.stack);
//   return res.status(500).send('Unknown Error in the server');
// });

// // start the Express server
// app.listen( port, () => {
//     console.log( `server started ${ port }` );
// } );