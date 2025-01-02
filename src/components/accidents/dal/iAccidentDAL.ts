import IMongoMatchQuery from '../models/iMongoMatchQuery1';
import IMongoFilterQuery from '../models/iMongoFilterQuery1';

export default interface IAccidentDAL {
    accident_count: (filter: IMongoMatchQuery) => any,
    accident_get_agg_list: (agg: IMongoFilterQuery, type: string) => any,
    accident_getGroupBy: (agg: IMongoFilterQuery) => any,
    accident_get_find_list: (find: IMongoFilterQuery, type: string) => any
  }