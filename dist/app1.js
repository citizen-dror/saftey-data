"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const users1_1 = __importDefault(require("./routes/users1"));
const accidentAPI_1 = __importDefault(require("./components/accidents/accidentAPI"));
const db = require('./database1');
const app = express_1.default();
const port = 8080; // default port to listen
// define a route handler
accidentAPI_1.default(app);
users1_1.default(app);
// if not find - navigate in react
app.use(express_1.default.static(path_1.default.join(__dirname, '../build')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../build/static')));
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../build', 'index.html'));
});
// start the Express server
app.listen(port, () => {
    console.log(`server started ${port}`);
});
//# sourceMappingURL=app1.js.map