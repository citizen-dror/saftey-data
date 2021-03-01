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

const getinitInjTypes = ({ injt }) => {
  // {"$or":
  // [{"injured_type_hebrew" : "הולך רגל"},
  // {"injured_type_hebrew" : "נהג - אופניים"},
  // ]}
  const injTypeArr = JSON.parse(injt);
  if (injTypeArr && injTypeArr.length > 0) {
    const arr = [];
    if (injTypeArr.includes(1)) arr.push({ injured_type_hebrew: 'הולך רגל' });
    if (injTypeArr.includes(2)) {
      arr.push({ injured_type_hebrew: 'נהג - אופניים' });
      arr.push({ injured_type_hebrew: 'נוסע - אופניים (לא נהג)' });
    }
    if (injTypeArr.includes(3)) {
      arr.push({ injured_type_hebrew: 'נהג - רכב לא ידוע' });
      arr.push({ injured_type_hebrew: 'נוסע - רכב לא ידוע' });
    }
    if (injTypeArr.includes(4)) {
      arr.push({ injured_type_hebrew: 'נהג - אופנוע' });
      arr.push({ injured_type_hebrew: 'נוסע - אופנוע (לא נהג)' });
    }
    if (injTypeArr.includes(5)) {
      arr.push({ injured_type_hebrew: 'נהג - רכב בעל 4 גלגלים ויותר' });
      arr.push({ injured_type_hebrew: 'נוסע - רכב בעל 4 גלגלים ויותר' });
    }
    const filter = { $or: arr };
    return filter;
  }
  return null;
};

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
