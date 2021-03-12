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

function getQueryDBnamesMap() {
  const map = new Map();
  map.set('year', 'accident_year');
  map.set('sev', 'injury_severity_hebrew');
  map.set('injt', 'injured_type_hebrew');
  map.set('city', 'accident_yishuv_name');
  map.set('cpop', 'cpop');
  map.set('st', 'street1_hebrew');
  map.set('rd', 'road1');
  map.set('rds', 'road_segment_name');
  map.set('sex', 'sex_hebrew');
  map.set('age', 'age_group_hebrew');
  map.set('pt', 'population_type_hebrew');
  map.set('dn', 'day_night_hebrew');
  map.set('mn', 'accident_month');
  map.set('wd', 'day_in_week_hebrew');
  map.set('acc', 'accident_type_hebrew');
  map.set('vcl', 'vehicle_vehicle_type_hebrew');
  map.set('vcli', 'vehicles');
  map.set('rt', 'road_type_hebrew');
  map.set('sp', 'speed_limit_hebrew');
  map.set('rw', 'road_width_hebrew');
  map.set('ml', 'multi_lane_hebrew');
  map.set('ol', 'one_lane_hebrew');
  return map;
}

const queryDBnamesMap = getQueryDBnamesMap();

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
function getFilterbyCityPop(queryObject, addLookup) {
  let filter = null;
  const lookup = {
    $lookup: {
      from: 'cities',
      localField: 'accident_yishuv_name',
      foreignField: 'name_he',
      as: 'city',
    },
  };
  const { p1, p2 } = queryObject;
  if (p1 && p2) {
    const pMin = parseInt(p1, 10);
    const pMax = parseInt(p2, 10);
    if (pMin > 0 && pMax > pMin) {
      filter = [
        lookup,
        { $match: { 'city.population': { $gte: pMin, $lte: pMax } } },
      ];
    }
  } else if (addLookup) {
    filter = [lookup];
  }

  return filter;
}

function getFilter(queryObject, useMatch, addCityLookup) {
  // return AccidentMoedel2.find({ accident_year: 2016 })
  const filterYear = getFilterYear(queryObject);
  const filterSev = getFilterByDictionary(queryObject, 'sev', queryDBnamesMap.get('sev'), mapInjSevirty);
  const filterInjType = getFilterByDictionary(queryObject, 'injt', queryDBnamesMap.get('injt'), mapInjTypes);
  const filterCity = getFilterByQurey(queryObject, 'city', queryDBnamesMap.get('city'));
  const filterStreet = getFilter2FildsByQurey(queryObject, 'st', 'street1_hebrew', 'street2_hebrew');
  const filterRoadNum = getFilter2FildsByQurey(queryObject, 'rd', 'road1', 'road2');
  const filterRoadSeg = getFilter2FildsByQurey(queryObject, 'rds', queryDBnamesMap.get('rds'));
  const filterSex = getFilterByDictionary(queryObject, 'sex', queryDBnamesMap.get('sex'), mapSex);
  const filterAge = getFilterByDictionary(queryObject, 'age', queryDBnamesMap.get('age'), mapAge);
  const filterPopType = getFilterByDictionary(queryObject, 'pt', queryDBnamesMap.get('pt'), mapPopType);
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
  ];
  if (filterSev) arrAnd.push(filterSev);
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
  // console.log(JSON.stringify(accfilter));
  const filterByPopArr = getFilterbyCityPop(queryObject, addCityLookup);
  let filterObj = null;
  if (filterByPopArr) {
    filterObj = { fType: 'agg', filter: [{ $match: accfilter }, ...filterByPopArr] };
  } else if (useMatch) {
    filterObj = { fType: 'agg', filter: [{ $match: accfilter }] };
  } else {
    filterObj = { fType: 'find', filter: accfilter };
  }
  return filterObj;
}

function getGroupByCityPop(limit, sort) {
  let filter = null;
  const group1 = JSON.parse('{"$group": {'
    + '"_id": "$accident_yishuv_name","t_count" : { "$sum" : 1 },"t_population" : { "$first" : "$city.population" }'
    + '}}');
  const unWind = JSON.parse('{ "$unwind" : "$t_population"}');
  const project = JSON.parse('{ "$project" : { "count" :'
    + '{ "$multiply" : [100000, { "$divide" : ["$t_count", "$t_population"] } ]}'
    + '}}');
  const sortF = JSON.parse(`{"$sort": {"count": ${sort}}}`);
  const limitF = (limit === 0) ? null : { $limit: limit };
  filter = [group1, unWind, project, sortF];
  if (limitF) filter.push(limitF);
  return filter;
}

function getGroupBy(queryObject) {
  let res = null;
  const queryPart = queryObject.gb;
  if (queryPart) {
    const groupName1 = queryDBnamesMap.get(queryPart);
    const queryP2 = queryObject.gb2;
    if (queryP2) {
      const groupName2 = queryDBnamesMap.get(queryP2);
      const metch1 = JSON.parse(`{ "$match" : { "${groupName2}" : { "$exists" : true, "$ne" : null}}}`);
      const grpids = `{ "grp1": "$${groupName1}", "grp2": "$${groupName2}"}`;
      const group1 = JSON.parse(`{"$group": { "_id":${grpids}, "count": { "$sum": 1 }}}`);
      const count = '{ "$push": {"grp2" : "$_id.grp2","count" : "$count" } }';
      const group2 = JSON.parse(`{"$group": { "_id": "$_id.grp1" , "count": ${count}}}`);
      res = [metch1, group1, group2];
    } else {
      const id = `$${groupName1}`;
      res = [{
        $group: {
          _id: id,
          count: {
            $sum: 1,
          },
        },
      }];
    }
  }
  return res;
}

function getSort() {
  return {
    $sort: {
      _id: 1,
    },
  };
}

function getFilterGroupBy(queryObject) {
  const queryPart = queryObject.gb;
  const groupName1 = queryDBnamesMap.get(queryPart);
  const groupByCityPop = (groupName1 === 'cpop');
  const filterObj = getFilter(queryObject, true, groupByCityPop);
  const { filter } = filterObj;
  if (groupByCityPop) {
    const groupBy = getGroupByCityPop(15, -1);
    return [...filter, ...groupBy];
  }
  const groupBy = getGroupBy(queryObject);
  const sort = getSort();
  return [...filter, ...groupBy, sort];
}

module.exports = { getFilter, getFilterGroupBy };
