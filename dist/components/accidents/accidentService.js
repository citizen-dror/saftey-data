var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const accidentDAL = require('./accidentDAL');
const accFilter = require('./accidentFilter');
// const logger = require('../../middlewares/logger');
// count all accidens by filter
exports.accident_count = (query) => __awaiter(this, void 0, void 0, function* () {
    const res = yield accidentDAL.accident_count_DAL(query);
    return res;
});
// get all accidens by filter
exports.accident_getList = (query, type) => __awaiter(this, void 0, void 0, function* () {
    const res = yield accidentDAL.accident_get_agg_list_DAL(query, type);
    return res;
});
// get group by accidens by filter
exports.accident_GroupBy_post = (query) => __awaiter(this, void 0, void 0, function* () {
    const res = yield accidentDAL.accident_getGroupBy_DAL(query);
    return res;
});
exports.accident_get = (queryObject) => __awaiter(this, void 0, void 0, function* () {
    // console.log(queryObject);
    const filterObj = accFilter.getFilter(queryObject, false);
    // console.log(filterObj);
    const { fType, filter } = filterObj;
    let res = null;
    if (fType === 'find') {
        res = yield accidentDAL.accident_get_find_list_DAL(filter, 'main');
    }
    else {
        res = yield accidentDAL.accident_get_agg_list_DAL(filter, 'main');
    }
    return res;
});
exports.accident_count_get = (queryObject) => __awaiter(this, void 0, void 0, function* () {
    // console.log(queryObject);
    const filterObj = accFilter.getFilter(queryObject, false);
    // console.log(filterObj);
    const { filter } = filterObj;
    const res = yield accidentDAL.accident_count_DAL(filter, 'main');
    return res;
});
exports.accident_getGroupBy = (queryObject) => __awaiter(this, void 0, void 0, function* () {
    // console.log(queryObject);
    const filterGroupBy = accFilter.getFilterGroupBy(queryObject);
    // console.log(JSON.stringify(filterGroupBy));
    const res = yield accidentDAL.accident_getGroupBy_DAL(filterGroupBy);
    return res;
});
//# sourceMappingURL=accidentService.js.map