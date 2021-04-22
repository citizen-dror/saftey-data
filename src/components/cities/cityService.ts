import cityDal from './cityDAL';

class cityService {
    public getCity = async (queryObject: any) => {
        if (queryObject.lang) {
            this.findBylang(queryObject);
        }
        if (queryObject.name_he) {
            return this.findByNameHe(queryObject)
        } else if (queryObject.name_en) {
            return this.findByNameEn(queryObject);
        } else {
            return this.findAll();
        }
    }
    public findBylang = async (queryObject: any) => {
        let proj = {};
        if (queryObject.lang === 'he') { proj = { name_he: 1 }; }
        else if (queryObject === 'ar') proj = { name_ar: 1 };
        else { proj = { name_en: 1 }; }
        const res = await cityDal.city_find({}, proj);
        return res;
    }
    public findByNameHe = async (queryObject: any) => {
        let proj = {};
        let find = { name_he: queryObject.name_he }
        const res = await cityDal.city_find(find, proj);
        return res;
    }
    public findByNameEn = async (queryObject: any) => {
        let proj = {};
        let find = { name_en: queryObject.name_en }
        const res = await cityDal.city_find(find, proj);
        return res;
    }
    public findAll = async () => {
        let proj = {};
        let find = {}
        const res = await cityDal.city_find(find, proj);
        return res;
    }
}
export default new cityService();