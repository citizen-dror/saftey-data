const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  title: String,
  tags: { type: Array },
  createdAt: { type: Date, required: true, default: Date.now },
  data: { type: Buffer, required: true },
});
module.exports = mongoose.model('Image', ImageSchema);
