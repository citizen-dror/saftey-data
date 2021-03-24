
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { IImage } from './images.model';
import { image_get_file, image_get_list, image_count } from './imageDAL';
import logger from '../../middlewares/logger';

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, './../uploads/');
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

const fetchImageFromDb = async (filename: string) => {
    try {
        const file: IImage = await image_get_file(filename);
        if (!file) {
            return (404); // 'No file exists'
        }
        if (file.contentType !== 'image/png' && file.contentType !== 'image/jpeg') {
            logger.info('404 - Not an image');
            return (404);
        }
        // logger.log(file.filename);
        const filePath = path.join(__dirname, '/../../../uploads', `${file.filename}`);
        fs.writeFileSync(filePath, file.data);
        return (200);
    } catch (err) {
        console.log('fetchImageFromDb', err)
        return 500;
    }
};

const prepareImages = async (array: any[]) => {
    array.forEach((element) => {
        const filePath = `../uploads/${element.filename}`;
        fs.access(filePath, async (err) => {
            if (err) {
                fetchImageFromDb(element.filename);
            }
        });
    });
    return null;
};

const countImages = async (query: any) => {
    try {
        const count = await image_count(query);
        return count;
    } catch (error) {
        return -1;
    }
};

const getProjectionByLang = (lang: string) => {
    let projection = null;
    let progLang = null;
    if (lang === '') projection = { data: 0 };
    else {
        const baseProjection = {
            _id: 1, filename: 1, contentType: 1, place: 1, tags: 1, index: 1, createdAt: 1,
        };
        if (lang === 'he') progLang = { titlehe: 1, texthe: 1 };
        else if (lang === 'en') progLang = { titleen: 1, texten: 1 };
        else progLang = { titlear: 1, textar: 1 };
        projection = { ...baseProjection, ...progLang };
    }
    return projection;
};

const get_image_by_tag = async (lang: string, tag: string) => {
    const projection = getProjectionByLang(lang);
    const cond = { tags: tag };
    const doc = await image_get_list(cond, projection);
    prepareImages(doc);
    return doc;
}

const get_image_by_city = async (lang: string, city: string) => {
    const projection = getProjectionByLang(lang);
    const cond = { place: city };
    const doc = await image_get_list(cond, projection);
    prepareImages(doc);
    return doc;
}

const checkFileExists = async (file: string) => {
    return fs.promises.access(file, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
}

const get_image_file = async (filename: string) => {
    const filePath = path.join(__dirname, '/../../../uploads', `${filename}`);
    // console.log("get image ", filePath);
    const foundFile = await checkFileExists(filePath);
    if (foundFile === true) {
        return { status: 200, file: filePath };
    } else {
        const status = await fetchImageFromDb(filename);
        return { status: status, file: filePath };
    }
};


export { get_image_file, get_image_by_tag, get_image_by_city, countImages, fetchImageFromDb, prepareImages, getProjectionByLang }