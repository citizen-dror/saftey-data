const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  filename: String,
  contentType: String,
  title: String,
  createDate: Date,
  data: Buffer,
});
module.exports = mongoose.model('Image', ImageSchema);
