const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
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
  createdAt: { type: Date, required: true, default: Date.now },
  data: { type: Buffer, required: true },
});
module.exports = mongoose.model('Image', ImageSchema);
