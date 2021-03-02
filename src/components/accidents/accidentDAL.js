const AccidentMoedel2 = require('./accidet');

const getProjByType = (type) => {
  let proj = {};
  if (type === 'main') {
    proj = {
      latitude: 1,
      longitude: 1,
      accident_timestamp: 1,
      day_in_week_hebrew: 1,
      day_night_hebrew: 1,
      accident_year: 1,
      injured_type_hebrew: 1,
      injury_severity_hebrew: 1,
      vehicle_vehicle_type_hebrew: 1,
      sex_hebrew: 1,
      age_group_hebrew: 1,
      population_type_hebrew: 1,
      accident_yishuv_name: 1,
      street1_hebrew: 1,
      street2_hebrew: 1,
      road1: 1,
      road2: 1,
      road_segment_name: 1,
      road_type_hebrew: 1,
      vehicles: 1,
      accident_type_hebrew: 1,
      speed_limit_hebrew: 1,
      multi_lane_hebrew: 1,
      one_lane_hebrew: 1,
      road_width_hebrew: 1,
    };
  } else if (type === 'latlon') {
    proj = { latitude: 1, longitude: 1, injury_severity_hebrew: 1 };
  }
  return proj;
};

exports.accident_count_DAL = (filter) => AccidentMoedel2.countDocuments(filter);

exports.accident_get_agg_list_DAL = (agg, type) => {
  const proj = { $project: getProjByType(type) };
  agg.push(proj);
  return AccidentMoedel2.aggregate(agg);
};

exports.accident_getGroupBy_DAL = (agg) => AccidentMoedel2.aggregate(agg);

exports.accident_get_find_list_DAL = (find, type) => {
  const proj = getProjByType(type);
  return AccidentMoedel2.find(find, proj);
};
