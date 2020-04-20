const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  filename: { type: String, required: true, unique: true },
  contentType: { type: String, required: true },
  title: { type: String },
  place: { type: String },
  tags: { type: Array },
  createdAt: { type: Date, required: true, default: Date.now },
  data: { type: Buffer, required: true },
});
module.exports = mongoose.model('Image', ImageSchema);
