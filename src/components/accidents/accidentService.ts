const accidentDAL = require('./accidentDAL');
const accFilter = require('./accidentFilter');
import {AccidentQuery} from './AccidentQuery';
// const logger = require('../../middlewares/logger');


// count all accidens by filter from post
const accident_count = async (query: any ) => {
  const res = await accidentDAL.accident_count_DAL(query);
  return res;
};

// get all accidens by filter (post)
const accident_getList = async (query: any, type) => {
  const res = await accidentDAL.accident_get_agg_list_DAL(query, type);
  return res;
};

// get group by accidens by filter
const accident_GroupBy_post = async (query: any) => {
  const res = await accidentDAL.accident_getGroupBy_DAL(query);
  return res;
};

const getProjType = (queryObject :AccidentQuery) =>{
  const { proj } = queryObject;
  const pType = (proj) ? proj : 'main';
  return pType;
}

const isAllFiltr = (queryObject :AccidentQuery) => {
  let res =false
  if (Object.keys(queryObject).length === 0 ) res = true;
  else if (Object.keys(queryObject).length >= 3) {
    let allRange = false;
    const { sy, ey } = queryObject;
    const sYear = (sy) ? parseInt(sy, 10) : 2015;
    const eYear = (ey) ? parseInt(ey, 10) : 2019;
    const sevS = queryObject['sev'];
    const proj = queryObject['proj'];
    if (sevS && sevS === '1,2' && sYear === 2015 && eYear=== 2019 ) allRange = true;
    if ((Object.keys(queryObject).length=== 3 && allRange) ||
    (Object.keys(queryObject).length=== 4 && allRange && proj)
    ) res  = true;
  }
  return res;
}

const accident_get = async (queryObject: AccidentQuery) => {
  // console.log(queryObject);
  const filterObj = accFilter.getFilter(queryObject, false);
  const pType = getProjType(queryObject);
  // console.log(filterObj);
  const { fType, filter } = filterObj;
  let res = null;
  if (fType === 'find') {
    res = await accidentDAL.accident_get_find_list_DAL(filter, pType, -1);
  } else {
    res = await accidentDAL.accident_get_agg_list_DAL(filter, pType);
  }
  return res;
};

const accident_count_get = async (queryObject: AccidentQuery) => {
  // console.log(queryObject);
  const filterObj = accFilter.getFilter(queryObject, false);
  // console.log(filterObj);
  const { filter } = filterObj;
  const res = await accidentDAL.accident_count_DAL(filter, 'main');
  return res;
};

const accident_getGroupBy = async (queryObject: AccidentQuery) => {
  // console.log(queryObject);
  const filterGroupBy = accFilter.getFilterGroupBy(queryObject);
  // console.log(JSON.stringify(filterGroupBy));
  const res = await accidentDAL.accident_getGroupBy_DAL(filterGroupBy);
  return res;
};

export {accident_getGroupBy, accident_count_get, accident_get, accident_count, accident_getList, accident_GroupBy_post, isAllFiltr}