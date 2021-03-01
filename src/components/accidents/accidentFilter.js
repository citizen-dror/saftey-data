const fs = require('fs');
const path = require('path');

const getFilterYear = ({ sy, ey }) => {
  const sYear = (sy) ? parseInt(sy, 10) : 2015;
  const eYear = (ey) ? parseInt(ey, 10) : 2019;
  return { accident_year: { $gte: sYear, $lte: eYear } };
};
const getFilterSev = ({ sev }) => {
  const sevInj = (sev) || 'הרוג';
  // ('dead', true, ['הרוג']));
  // ('severly-injured', false, ['פצוע קשה']));
  return { injury_severity_hebrew: sevInj };
};

const jsonFilters = fs.readFileSync(`${path.join(__dirname, 'filterCols.json')}`);
/**
 * array of filters columns. each filter name has array of pairs.
 * each pair is the query sting value and the db value.
 */
const FILTER_ARR = JSON.parse(jsonFilters);
/**
 * create Map form array of pairs. the key is the query-string value, value is the db value.
 * @param {string} filterName
 */
const jsonToMap = (filterName) => {
  const objFilter = FILTER_ARR[filterName];
  return new Map(objFilter);
};
// List of Maps, each Map is one cloumn in db
// const mapInjSevirty = jsonToMap('injury_severity');
const mapInjTypes = jsonToMap('injured_type');
const mapSex = jsonToMap('sex');
const mapAge = jsonToMap('age_group');
const mapPopType = jsonToMap('population_type');
const mapDayNight = jsonToMap('day_night');
const mapMonth = jsonToMap('accident_month');
const mapAccidentType = jsonToMap('accident_type');
const mapVehicle = jsonToMap('vehicle_vehicle_type');
const mapRoadType = jsonToMap('road_type');
const mapSpeedLimit = jsonToMap('speed_limit');
const mapRoadWidth = jsonToMap('road_width');
const mapMultiLane = jsonToMap('multi_lane');
const mapOneLane = jsonToMap('one_lane');

/**
 * create filter from query string sentence
 * @param {ParsedUrlQuery} queryObject - query objcet form the request
 * @param {string} qName - query parmter name.
 * @param {string} colName - column name in db.
 * @param {Map} mapFilterValues - Map of values in query (key) and db (value).
 */
function getFilterFromQuery(queryObject, qName, colName, mapFilterValues) {
  const queryPart = queryObject[qName];
  if (queryPart) {
    const queryValsArr = JSON.parse(`[${queryPart}]`);
    if (queryValsArr && queryValsArr.length > 0) {
      const arr = queryValsArr.map((x) => ({ [colName]: mapFilterValues.get(x) }));
      const filter = { $or: arr };
      return filter;
    }
  }
  return null;
}

// function getFilterInjTypes({ injt }) {
//   const injTypeArr = JSON.parse(`[${injt}]`);
//   if (injTypeArr && injTypeArr.length > 0) {
//     const arr = injTypeArr.map((x) => ({ injured_type_hebrew: mapInjTypes.get(x) }));
//     const filter = { $or: arr };
//     return filter;
//   }
//   return null;
// }

module.exports = function getFilter(queryObject) {
  // return AccidentMoedel2.find({ accident_year: 2016 })
  const filterYear = getFilterYear(queryObject);
  const filterSev = getFilterSev(queryObject);
  const filterInjType = getFilterFromQuery(queryObject, 'injt', 'injured_type_hebrew', mapInjTypes);
  const filterSex = getFilterFromQuery(queryObject, 'sex', 'sex_hebrew', mapSex);
  const filterAge = getFilterFromQuery(queryObject, 'age', 'age_group_hebrew', mapAge);
  const filterPopType = getFilterFromQuery(queryObject, 'pt', 'population_type_hebrew', mapPopType);
  const filterDayNight = getFilterFromQuery(queryObject, 'dn', 'day_night_hebrew', mapDayNight);
  const filterMonth = getFilterFromQuery(queryObject, 'mn', 'accident_month', mapMonth);
  const filtrtAccidentType = getFilterFromQuery(queryObject, 'acc', 'accident_type_hebrew', mapAccidentType);
  const filterVehicle = getFilterFromQuery(queryObject, 'vcl', 'vehicle_vehicle_type_hebrew', mapVehicle);
  const filterRoadType = getFilterFromQuery(queryObject, 'rt', 'road_type_hebrew', mapRoadType);
  const filterSpeedLimit = getFilterFromQuery(queryObject, 'sp', 'speed_limit_hebrew', mapSpeedLimit);
  const filterRoadWidth = getFilterFromQuery(queryObject, 'rw', 'road_width_hebrew', mapRoadWidth);
  const filterMultiLane = getFilterFromQuery(queryObject, 'ml', 'multi_lane_hebrew', mapMultiLane);
  const filterOneLane = getFilterFromQuery(queryObject, 'ol', 'one_lane_hebrew', mapOneLane);

  // return filterSev;
  const arrAnd = [
    filterYear,
    filterSev,
  ];
  if (filterInjType) arrAnd.push(filterInjType);
  if (filterAge) arrAnd.push(filterAge);
  if (filterSex) arrAnd.push(filterSex);
  if (filterPopType) arrAnd.push(filterPopType);
  if (filterDayNight) arrAnd.push(filterDayNight);
  if (filterMonth) arrAnd.push(filterMonth);
  if (filtrtAccidentType) arrAnd.push(filtrtAccidentType);
  if (filterVehicle) arrAnd.push(filterVehicle);
  if (filterRoadType) arrAnd.push(filterRoadType);
  if (filterSpeedLimit) arrAnd.push(filterSpeedLimit);
  if (filterRoadWidth) arrAnd.push(filterRoadWidth);
  if (filterMultiLane) arrAnd.push(filterMultiLane);
  if (filterOneLane) arrAnd.push(filterOneLane);
  const filter = { $and: arrAnd };
  return filter;
};
