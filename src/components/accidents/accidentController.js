const accidentDAL = require('./accidentDAL');
const getFilter = require('./accidentFilter');
// const logger = require('../../middlewares/logger');

// count all accidens by filter
exports.accident_count = (req, res) => {
  accidentDAL.accident_count_DAL(req.body)
    .then((doc) => res.jsonp(doc));
};

// get all accidens by filter
exports.accident_getList = (req, res, type) => {
  accidentDAL.accident_get_agg_list_DAL(req.body, type)
    .then((doc) => res.jsonp(doc));
};

// get group by accidens by filter
exports.accident_getGroupBy = (req, res) => {
  accidentDAL.accident_getGroupBy_DAL(req.body)
    .then((doc) => res.jsonp(doc));
};

exports.accident_get = (req, res, queryObject) => {
  // console.log(queryObject);
  const filterObj = getFilter(queryObject);
  // console.log(filterObj);
  const { fType, filter } = filterObj;
  if (fType === 'find') {
    accidentDAL.accident_get_find_list_DAL(filter, 'main')
      .then((doc) => res.jsonp(doc));
  } else {
    accidentDAL.accident_get_agg_list_DAL(filter, 'main')
      .then((doc) => res.jsonp(doc));
  }
};
