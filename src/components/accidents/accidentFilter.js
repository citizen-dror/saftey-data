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
  const filter = { $and: arrAnd };
  return filter;
};
