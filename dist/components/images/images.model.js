"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
    filename: { type: String, required: true, unique: true },
    contentType: { type: String, required: true },
    titlehe: { type: String },
    texthe: { type: String },
    titleen: { type: String },
    texten: { type: String },
    titlear: { type: String },
    textar: { type: String },
    place: { type: String },
    tags: { type: Array },
    index: { type: Number },
    createdAt: { type: Date, required: true, default: Date.now },
    data: { type: Buffer, required: true },
});
const ImageModel = mongoose_1.model('Image', ImageSchema);
exports.default = { ImageModel };
//# sourceMappingURL=images.model.js.map