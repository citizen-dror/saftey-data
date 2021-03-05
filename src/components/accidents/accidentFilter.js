const fs = require('fs');
const path = require('path');

const getFilterYear = ({ sy, ey }) => {
  const sYear = (sy) ? parseInt(sy, 10) : 2015;
  const eYear = (ey) ? parseInt(ey, 10) : 2019;
  return { accident_year: { $gte: sYear, $lte: eYear } };
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
const mapInjSevirty = jsonToMap('injury_severity');
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
function getFilterByDictionary(queryObject, qName, colName, mapFilterValues) {
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
function getFilterByQurey(queryObject, qName, colName) {
  const queryPart = queryObject[qName];
  if (queryPart) {
    const queryValsArr = JSON.parse(`[${queryPart}]`);
    if (queryValsArr && queryValsArr.length > 0) {
      const arr = queryValsArr.map((x) => ({ [colName]: x }));
      const filter = { $or: arr };
      return filter;
    }
  }
  return null;
}

function getFilter2FildsByQurey(queryObject, qName, colName1, colName2) {
  const queryPart = queryObject[qName];
  if (queryPart) {
    const queryValsArr = JSON.parse(`[${queryPart}]`);
    if (queryValsArr && queryValsArr.length > 0) {
      const arr1 = queryValsArr.map((x) => ({ [colName1]: x }));
      const arr2 = queryValsArr.map((x) => ({ [colName2]: x }));
      const arr = arr1.concat(arr2);
      const filter = { $or: arr };
      return filter;
    }
  }
  return null;
}

// filter accidents using aggrgation pipline
function getAggFilter(queryObject, filteAcc, useMatch) {
  const { p1, p2 } = queryObject;
  if (p1 && p2) {
    const pMin = parseInt(p1, 10);
    const pMax = parseInt(p2, 10);
    if (pMin > 0 && pMax > pMin) {
      const filter = [
        { $match: filteAcc },
        {
          $lookup: {
            from: 'cities',
            localField: 'accident_yishuv_name',
            foreignField: 'name_he',
            as: 'city',
          },
        },
        { $match: { 'city.population': { $gte: pMin, $lte: pMax } } },
      ];
      return { fType: 'agg', filter };
    } return { fType: 'find', filter: filteAcc };
  } if (useMatch) {
    return { fType: 'agg', filter: { $match: filteAcc } };
  } return { fType: 'find', filter: filteAcc };
}

function getFilter(queryObject, useMatch) {
  // return AccidentMoedel2.find({ accident_year: 2016 })
  const filterYear = getFilterYear(queryObject);
  const filterSev = getFilterByDictionary(queryObject, 'sev', 'injury_severity_hebrew', mapInjSevirty);
  const filterInjType = getFilterByDictionary(queryObject, 'injt', 'injured_type_hebrew', mapInjTypes);
  const filterCity = getFilterByQurey(queryObject, 'city', 'accident_yishuv_name');
  const filterStreet = getFilter2FildsByQurey(queryObject, 'st', 'street1_hebrew', 'street2_hebrew');
  const filterRoadNum = getFilter2FildsByQurey(queryObject, 'rd', 'road1', 'road2');
  const filterRoadSeg = getFilter2FildsByQurey(queryObject, 'rds', 'road_segment_name');
  const filterSex = getFilterByDictionary(queryObject, 'sex', 'sex_hebrew', mapSex);
  const filterAge = getFilterByDictionary(queryObject, 'age', 'age_group_hebrew', mapAge);
  const filterPopType = getFilterByDictionary(queryObject, 'pt', 'population_type_hebrew', mapPopType);
  const filterDayNight = getFilterByDictionary(queryObject, 'dn', 'day_night_hebrew', mapDayNight);
  const filterMonth = getFilterByDictionary(queryObject, 'mn', 'accident_month', mapMonth);
  const filtrtAccidentType = getFilterByDictionary(queryObject, 'acc', 'accident_type_hebrew', mapAccidentType);
  const filterVehicle = getFilterByDictionary(queryObject, 'vcl', 'vehicle_vehicle_type_hebrew', mapVehicle);
  const filterRoadType = getFilterByDictionary(queryObject, 'rt', 'road_type_hebrew', mapRoadType);
  const filterSpeedLimit = getFilterByDictionary(queryObject, 'sp', 'speed_limit_hebrew', mapSpeedLimit);
  const filterRoadWidth = getFilterByDictionary(queryObject, 'rw', 'road_width_hebrew', mapRoadWidth);
  const filterMultiLane = getFilterByDictionary(queryObject, 'ml', 'multi_lane_hebrew', mapMultiLane);
  const filterOneLane = getFilterByDictionary(queryObject, 'ol', 'one_lane_hebrew', mapOneLane);

  // return filterSev;
  const arrAnd = [
    filterYear,
    filterSev,
  ];
  if (filterInjType) arrAnd.push(filterInjType);
  if (filterCity) arrAnd.push(filterCity);
  if (filterStreet) arrAnd.push(filterStreet);
  if (filterRoadNum) arrAnd.push(filterRoadNum);
  if (filterRoadSeg) arrAnd.push(filterRoadSeg);
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
  const accfilter = { $and: arrAnd };
  const filterObj = getAggFilter(queryObject, accfilter, useMatch);
  return filterObj;
}

function getGroupBy(queryObject) {
  const queryPart = queryObject.gb;
  if (queryPart) {
    return {
      $group: {
        _id: `$${queryPart}`,
        count: {
          $sum: 1,
        },
      },
    };
  } return null;
}

function getSort() {
  return {
    $sort: {
      _id: 1,
    },
  };
}

function getFilterGroupBy(queryObject) {
  const filterObj = getFilter(queryObject, true);
  const { filter } = filterObj;
  const groupBy = getGroupBy(queryObject);
  const sort = getSort();
  return [filter, groupBy, sort];
}

module.exports = { getFilter, getFilterGroupBy };
