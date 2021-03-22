"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const images_model_1 = __importDefault(require("./images.model"));
const logger_1 = __importDefault(require("../../middlewares/logger"));
const router = express_1.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './../uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer_1.default({ storage });
const imageRoute = (app) => {
    app.use('/api/v1/img', router);
    //move to service
    const fetchImageFromDb = (filename) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const file = yield images_model_1.default.ImageModel.findOne({ filename }).exec();
            if (!file) {
                return (404); // 'No file exists'
            }
            if (file.contentType !== 'image/png' && file.contentType !== 'image/jpeg') {
                logger_1.default.info('404 - Not an image');
                return (404);
            }
            // logger.log(file.filename);
            const filePath = path_1.default.join(__dirname, '/../../../uploads', `${file.filename}`);
            fs_1.default.writeFileSync(filePath, file.data);
            return (200);
        }
        catch (err) {
            console.log('fetchImageFromDb', err);
            return 500;
        }
    });
    const prepareImages = (array) => __awaiter(void 0, void 0, void 0, function* () {
        array.forEach((element) => {
            const filePath = `../uploads/${element.filename}`;
            fs_1.default.access(filePath, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    fetchImageFromDb(element.filename);
                }
            }));
        });
        return null;
    });
    const countImages = (query) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const count = yield images_model_1.default.ImageModel.countDocuments(query).exec();
            return count;
        }
        catch (error) {
            return -1;
        }
    });
    const getProjectionByLang = (lang) => {
        let projection = null;
        let progLang = null;
        if (lang === '')
            projection = { data: 0 };
        else {
            const baseProjection = {
                _id: 1, filename: 1, contentType: 1, place: 1, tags: 1, index: 1, createdAt: 1,
            };
            if (lang === 'he')
                progLang = { titlehe: 1, texthe: 1 };
            else if (lang === 'en')
                progLang = { titleen: 1, texten: 1 };
            else
                progLang = { titlear: 1, textar: 1 };
            projection = Object.assign(Object.assign({}, baseProjection), progLang);
        }
        return projection;
    };
    //controlers
    router.get('/tags/:lang/:tag', (req, res) => {
        const { lang, tag } = req.params;
        const projection = getProjectionByLang(lang);
        const cond = { tags: tag };
        images_model_1.default.ImageModel.find(cond, projection).sort({ index: 1 })
            .then((doc) => {
            prepareImages(doc);
            return res.jsonp(doc);
        })
            .catch((err) => res.status(500).jsonp(err));
        return true;
    });
    router.get('/tags/:tag', (req, res) => {
        const { tag } = req.params;
        const projection = getProjectionByLang('');
        const cond = { tags: tag };
        images_model_1.default.ImageModel.find(cond, projection).sort({ index: 1 })
            .then((doc) => {
            prepareImages(doc);
            return res.jsonp(doc);
        })
            .catch((err) => res.status(500).jsonp(err));
        return true;
    });
    router.get('/place/:lang/:city', (req, res) => {
        const { lang, city } = req.params;
        const projection = getProjectionByLang(lang);
        const cond = { place: city };
        images_model_1.default.ImageModel.find(cond, projection)
            .then((doc) => {
            prepareImages(doc);
            res.jsonp(doc);
        })
            .catch((err) => res.status(500).jsonp(err));
        return true;
    });
    router.get('/count/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const count = yield countImages({});
        if (count >= 0) {
            return res.status(200).json({ count });
        }
        return res.status(500).json('error');
    }));
    router.get('/:filename', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, '/../../../uploads', `${req.params.filename}`);
        console.log("get image ", filePath);
        let foundFile = true;
        yield fs_1.default.access(filePath, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                foundFile = false;
                yield fetchImageFromDb(req.params.filename)
                    .then(((status) => {
                    console.log("after fetchImageFromDb");
                    if (status === 200) {
                        console.log("status 200");
                        return res.sendFile(filePath);
                    }
                    if (status === 404) {
                        console.log("No file exists");
                        return res.status(status).json({
                            err: 'No file exists',
                        });
                    }
                    {
                        console.log("No image file exists", status);
                        return res.status(500).json('eror on image fetch');
                    }
                }));
                // file exists
            }
            if (foundFile)
                return res.sendFile(filePath);
        }));
    }));
};
exports.default = imageRoute;
//# sourceMappingURL=imagesAPI.js.map