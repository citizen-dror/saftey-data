import { Router, Request, Response } from 'express';

import {
  get_image_file,
  get_image_by_tag,
  get_image_by_city,
  countImages,
} from './imageService';

const router = Router();

const imageRoute = (app: Router) => {
  app.use('/api/v1/img', router);

  //controlers
  router.get('/tags/:lang/:tag', async (req, res) => {
    const { lang, tag } = req.params;
    const doc = await get_image_by_tag(lang, tag);
    return res.jsonp(doc);
  });

  router.get('/tags/:tag', async (req, res) => {
    const { lang, tag } = req.params;
    const doc = await get_image_by_tag('', tag);
    return res.jsonp(doc);
  });

  router.get('/place/:lang/:city', async (req, res) => {
    const { lang, city } = req.params;
    const doc = await get_image_by_city(lang, city);
    return res.jsonp(doc);
  });

  router.get('/count/', async (req, res) => {
    const count = await countImages({});
    if (count >= 0) {
      return res.status(200).json({ count });
    }
    return res.status(500).json('error');
  });

  router.get('/:filename', async (req, res) => {
    const {status, file }= await get_image_file(req.params.filename);
    if (status === 200) {
      return res.sendFile(file);
    } else if (status === 404) {
      return res.status(status).json({
        err: 'No file exists',
      });
    } else {
      console.log("No image file exists", status);
      return res.status(500).json('eror on image fetch');
    }
  });
}

export default imageRoute;
