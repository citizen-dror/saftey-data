const express = require( "express" );
const path = require('path');
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/api/v1", ( req: any, res : any ) => {
    res.send( "Hello world server ts!" );
} );

  // if not find - navigate in react
  app.use(express.static(path.join(__dirname, '../build')));
  app.use(express.static(path.join(__dirname, '../build/static')));
  app.get('/*', (req: any, res : any) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });

// start the Express server
app.listen( port, () => {
    console.log( `server started ${ port }` );
} );