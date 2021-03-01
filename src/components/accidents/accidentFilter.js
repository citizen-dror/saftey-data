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

module.exports = function getFilter(queryObject) {
  // return AccidentMoedel2.find({ accident_year: 2016 })
  const filterYear = getFilterYear(queryObject);
  const filterSev = getFilterSev(queryObject);
  // const filter3 = getinitInjTypes(queryObject);
  // return filterSev;
  const arrAnd = [
    filterYear,
    filterSev,
  ];
  const filter = { $and: arrAnd };
  return filter;
};

// const getinitInjTypes = ({ injt }) => {
//   // {"$or":
//   // [{"injured_type_hebrew" : "הולך רגל"},
//   // {"injured_type_hebrew" : "נהג - אופניים"},{"injured_type_hebrew" : "נוסע - אופניים (לא נהג)"}]}
//   // ]}
//   if (injt && injt.length > 0) {
//     const arr = [];
//     if (injt.includes(1)) arr.push({ injured_type_hebrew: 'הולך רגל' });
//     if (injt.includes(2)) {
//       arr.push({ injured_type_hebrew: 'נהג - אופניים' });
//       arr.push({ injured_type_hebrew: 'נוסע - אופניים (לא נהג)' });
//     }
//     if (injt.includes(3)) {
//       arr.push({ injured_type_hebrew: 'נהג - רכב לא ידוע' });
//       arr.push({ injured_type_hebrew: 'נוסע - רכב לא ידוע' });
//     }
//     if (injt.includes(4)) {
//       arr.push({ injured_type_hebrew: 'נהג - אופנוע' });
//       arr.push({ injured_type_hebrew: 'נוסע - אופנוע (לא נהג)' });
//     }
//     if (injt.includes(5)) {
//       arr.push({ injured_type_hebrew: 'נהג - רכב בעל 4 גלגלים ויותר' });
//       arr.push({ injured_type_hebrew: 'נוסע - רכב בעל 4 גלגלים ויותר' });
//     }
//     const filter = { $or: arr };
//     return filter;
//   }
//   return null;
// };
