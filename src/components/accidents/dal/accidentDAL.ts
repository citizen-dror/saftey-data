const AccidentModel2 = require('./accidentSchema');
import IMongoFilterQuery from '../models/iMongoFilterQuery1';
import IMongoMatchQuery from '../models/iMongoMatchQuery1';
import IAccidentDAL from './iAccidentDAL';

class accidentDAL implements IAccidentDAL {

  private getProjByType = (type: string) => {
    let proj = {};
    if (type === 'main') {
      proj = {
        latitude: 1,
        longitude: 1,
        location_accuracy_hebrew: 1,
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

  public accident_count = (filter: IMongoMatchQuery) => AccidentModel2.countDocuments(filter);

  public accident_get_agg_list = (agg: IMongoFilterQuery, type: string) => {
    const proj = { $project: this.getProjByType(type) };
    agg.push(proj);
    return AccidentModel2.aggregate(agg);
  };

  public accident_getGroupBy = (agg: IMongoFilterQuery) => {
    // console.log(JSON.stringify(agg));
    return AccidentModel2.aggregate(agg);
  }
  // console.log(JSON.stringify(agg));

  public accident_get_find_list = (find: IMongoFilterQuery, type: string) => {
    const proj = this.getProjByType(type);
    return AccidentModel2.find(find, proj);
  };
}
export default new accidentDAL();
