const accFilter = require('./accidentFilter');
import {AccidentQuery} from './AccidentQuery';
import {accidentDALInterface} from './accidentDAL';
// const logger = require('../../middlewares/logger');

class accidentService {
  accidentDAL: accidentDALInterface;
  constructor(accidentDAL: accidentDALInterface) {
    this.accidentDAL = accidentDAL;
  };
// count all accidens by filter from post
public count_post = async (query: any ) => {
  const res = await this.accidentDAL.accident_count(query);
  return res;
};

// get all accidens by filter (post)
public getList_post = async (query: any, type) => {
  const res = await this.accidentDAL.accident_get_agg_list(query, type);
  return res;
};

// get group by accidens by filter
public groupBy_post = async (query: any) => {
  const res = await this.accidentDAL.accident_getGroupBy(query);
  return res;
};

private getProjType = (queryObject :AccidentQuery) =>{
  const { proj } = queryObject;
  const pType = (proj) ? proj : 'main';
  return pType;
}

public isAllFiltr = (queryObject :AccidentQuery) => {
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

public get_list = async (queryObject: AccidentQuery) => {
  // console.log(queryObject);
  const filterObj = accFilter.getFilter(queryObject, false);
  const pType = this.getProjType(queryObject);
  // console.log(filterObj);
  const { fType, filter } = filterObj;
  let res = null;
  if (fType === 'find') {
    res = await this.accidentDAL.accident_get_find_list(filter, pType);
  } else {
    res = await this.accidentDAL.accident_get_agg_list(filter, pType);
  }
  return res;
};

public count_get = async (queryObject: AccidentQuery) => {
  // console.log(queryObject);
  const filterObj = accFilter.getFilter(queryObject, false);
  // console.log(filterObj);
  const { filter } = filterObj;
  const res = await this.accidentDAL.accident_count(filter);
  return res;
};

public getGroupBy = async (queryObject: AccidentQuery) => {
  // console.log(queryObject);
  const filterGroupBy = accFilter.getFilterGroupBy(queryObject);
  // console.log(JSON.stringify(filterGroupBy));
  const res = await this.accidentDAL.accident_getGroupBy(filterGroupBy);
  return res;
}
}
export default accidentService;

//export {accident_getGroupBy, accident_count_get, accident_get, accident_count, accident_getList, accident_GroupBy_post, isAllFiltr}