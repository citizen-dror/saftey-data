const mongoose = require('mongoose');

const AccidentSchema = mongoose.Schema({
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

module.exports = mongoose.model('Accident', AccidentSchema, 'accidents');
