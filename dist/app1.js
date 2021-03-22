"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const users1_1 = __importDefault(require("./routes/users1"));
const imagesAPI_1 = __importDefault(require("./components/images/imagesAPI"));
const accidentAPI_1 = __importDefault(require("./components/accidents/accidentAPI"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const db = require('./database1');
const app = express_1.default();
// Get port from environment and store in Express.
const port = process.env.PORT || 5000;
// define a route handler
accidentAPI_1.default(app);
imagesAPI_1.default(app);
users1_1.default(app);
// if not find - navigate in react
app.use(express_1.default.static(path_1.default.join(__dirname, '../build')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../build/static')));
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../build', 'index.html'));
});
app.use((req, res) => {
    logger_1.default.info(`404 - ${req.originalUrl}`, req.body);
    res.status(404).send('The url you requested cannot be found.');
});
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    logger_1.default.error(error.stack);
    return res.status(500).send('Unknown Error in the server');
});
// start the Express server
app.listen(port, () => {
    console.log(`server started ${port}`);
});
//# sourceMappingURL=app1.js.map