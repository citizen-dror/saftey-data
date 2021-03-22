const accidentDAL = require('./accidentDAL');
const accFilter = require('./accidentFilter');
// const logger = require('../../middlewares/logger');

// count all accidens by filter
exports.accident_count = async (query) => {
  const res = await accidentDAL.accident_count_DAL(query);
  return res;
};

// get all accidens by filter
exports.accident_getList = async (query, type) => {
  const res = await accidentDAL.accident_get_agg_list_DAL(query, type);
  return res;
};

// get group by accidens by filter
exports.accident_GroupBy_post = async (query) => {
  const res = await accidentDAL.accident_getGroupBy_DAL(query);
  return res;
};

exports.accident_get = async (queryObject) => {
  // console.log(queryObject);
  const filterObj = accFilter.getFilter(queryObject, false);
  // console.log(filterObj);
  const { fType, filter } = filterObj;
  let res = null;
  if (fType === 'find') {
    res = await accidentDAL.accident_get_find_list_DAL(filter, 'main');
  } else {
    res = await accidentDAL.accident_get_agg_list_DAL(filter, 'main');
  }
  return res;
};

exports.accident_count_get = async (queryObject) => {
  // console.log(queryObject);
  const filterObj = accFilter.getFilter(queryObject, false);
  // console.log(filterObj);
  const { filter } = filterObj;
  const res = await accidentDAL.accident_count_DAL(filter, 'main');
  return res;
};

exports.accident_getGroupBy = async (queryObject) => {
  // console.log(queryObject);
  const filterGroupBy = accFilter.getFilterGroupBy(queryObject);
  // console.log(JSON.stringify(filterGroupBy));
  const res = await accidentDAL.accident_getGroupBy_DAL(filterGroupBy);
  return res;
};
