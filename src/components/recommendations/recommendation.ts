import mongoose from 'mongoose';

const RecommendationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: String,
  category: String,
  description: String,
  tags: [String],
  language: String,
  lang: String,
  references: [
    {
      title: String,
      url: String
    }
  ],
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema, 'Recommendations');
