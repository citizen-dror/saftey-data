const accidentDAL = require('./accidentDAL');
// const logger = require('../../middlewares/logger');

// count all accidens by filter
exports.accident_count = (req, res) => {
  accidentDAL.accident_count_DAL(req.body)
    .then((doc) => res.jsonp(doc));
};

// get all accidens by filter
exports.accident_getList = (req, res, type) => {
  accidentDAL.accident_getList_DAL(req.body, type)
    .then((doc) => res.jsonp(doc));
};

// get group by accidens by filter
exports.accident_getGroupBy = (req, res) => {
  accidentDAL.accident_getGroupBy_DAL(req.body)
    .then((doc) => res.jsonp(doc));
};
