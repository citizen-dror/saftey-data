import { Router, Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import imageModel, {IImage} from './images.model';
import logger from '../../middlewares/logger';

const router = Router();

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, './../uploads/');
  },
  filename: (req: any , file: any, cb: any) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const imageRoute = (app: Router) => {
  app.use('/api/v1/img', router);

  //move to service
  const fetchImageFromDb = async (filename: string) => {
    try {
      const file: IImage = await imageModel.ImageModel.findOne({ filename }).exec();
      if (!file) {
        return (404); // 'No file exists'
      }
      if (file.contentType !== 'image/png' && file.contentType !== 'image/jpeg') {
        logger.info('404 - Not an image');
        return (404);
      }
      // logger.log(file.filename);
      const filePath = path.join(__dirname, '/../../../uploads',`${file.filename}`);
      fs.writeFileSync(filePath, file.data);
      return (200);
    } catch (err) {
      console.log ('fetchImageFromDb', err)
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
      const count = await imageModel.ImageModel.countDocuments(query).exec();
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

  //controlers

  router.get('/tags/:lang/:tag', (req, res) => {
    const { lang, tag } = req.params;
    const projection = getProjectionByLang(lang);
    const cond = { tags: tag };
    imageModel.ImageModel.find(cond, projection).sort({ index: 1 })
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
    imageModel.ImageModel.find(cond, projection).sort({ index: 1 })
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
    imageModel.ImageModel.find(cond, projection)
      .then((doc) => {
        prepareImages(doc);
        res.jsonp(doc);
      })
      .catch((err) => res.status(500).jsonp(err));
    return true;
  });
  
  router.get('/count/', async (req, res) => {
    const count = await countImages({});
    if (count >= 0) {
      return res.status(200).json({ count });
    }
    return res.status(500).json('error');
  });
  
  router.get('/:filename', async (req, res) => {
    const filePath = path.join(__dirname, '/../../../uploads',`${req.params.filename}`);
    console.log("get image ", filePath);
    let foundFile = true;
    await fs.access(filePath, async (err) => {
      if (err) {
        foundFile = false;
        await fetchImageFromDb(req.params.filename)
          .then(((status) => {
            console.log("after fetchImageFromDb");
            if (status === 200) {
              console.log("status 200");
              return res.sendFile(filePath);
            } if (status === 404) {
              console.log("No file exists");
              return res.status(status).json({
                err: 'No file exists',
              });
            } 
            {
              console.log("No image file exists",status );
              return res.status(500).json('eror on image fetch');
            }
          }));
        // file exists
      }
      if (foundFile) return res.sendFile(filePath);
    });
  });
};

export default imageRoute;
