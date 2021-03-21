"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const AccidentSchema = new mongoose_1.default.Schema({
    _id: String,
    accident_year: Number,
    accident_timestamp: String,
    injury_severity_hebrew: String,
    age_group_hebrew: String,
    sex_hebrew: String,
    accident_yishuv_name: String,
    street1_hebrew: String,
    street2_hebrew: String,
    road_type_hebrew: String,
    road_light_hebrew: String,
    latitude: String,
    longitude: String,
});
module.exports = mongoose_1.default.model('Accident2', AccidentSchema, 'accidents');
//# sourceMappingURL=accident.js.map