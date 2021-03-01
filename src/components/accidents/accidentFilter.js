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

const setMapInjTypes = () => {
  const map = new Map();
  map.set(1, 'הולך רגל');
  map.set(2, 'נהג - רכב בעל 4 גלגלים ויותר');
  map.set(3, 'נוסע - רכב בעל 4 גלגלים ויותר');
  map.set(4, 'נהג - אופנוע');
  map.set(5, 'נוסע - אופנוע (לא נהג)');
  map.set(6, 'נהג - אופניים');
  map.set(7, 'נוסע - אופניים (לא נהג)');
  map.set(8, 'נהג - רכב לא ידוע');
  map.set(9, 'נוסע - רכב לא ידוע');
  return map;
};
const mapInjTypes = setMapInjTypes(setMapInjTypes);

function getinitInjTypes({ injt }) {
  const injTypeArr = JSON.parse(`[${injt}]`);
  if (injTypeArr && injTypeArr.length > 0) {
    const arr = injTypeArr.map((x) => ({ injured_type_hebrew: mapInjTypes.get(x) }));
    const filter = { $or: arr };
    return filter;
  }
  return null;
}

module.exports = function getFilter(queryObject) {
  // return AccidentMoedel2.find({ accident_year: 2016 })
  const filterYear = getFilterYear(queryObject);
  const filterSev = getFilterSev(queryObject);
  const filterInjType = getinitInjTypes(queryObject);
  // return filterSev;
  const arrAnd = [
    filterYear,
    filterSev,
  ];
  if (filterInjType) arrAnd.push(filterInjType);
  const filter = { $and: arrAnd };
  return filter;
};
