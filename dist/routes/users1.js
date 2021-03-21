"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
exports.default = (app) => {
    app.use('/api/v1/users', route);
    route.get('/test', (req, res) => {
        return res.json({ user: 'mosh' }).status(200);
    });
};
//# sourceMappingURL=users1.js.map