import express, { Request, Response } from 'express';
import path from 'path';
require('dotenv').config();
import usersRoute from './routes/users1';
import accidentRoute from './components/accidents/accidentAPI';
const db = require('./database1');

const app = express();
const port = 8080; // default port to listen

// define a route handler
accidentRoute(app); 
usersRoute(app);

// if not find - navigate in react
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../build/static')));
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// start the Express server
app.listen( port, () => {
    console.log( `server started ${ port }` );
} );