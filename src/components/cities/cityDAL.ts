const CityModel = require('./city');

class cityDAL {
  public city_find = (filter:any , proj: any) => {
    return CityModel.find(filter, proj)
  }

}
export default new cityDAL();
