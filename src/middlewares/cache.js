const NodeCache = require('node-cache');
const logger = require('./logger');

// stdTTL: time to live in seconds for every generated cache element.
const cacheTime = 7 * 24 * 60 * 60;
// const cacheTime = 5* 60;
const cache = new NodeCache({ stdTTL: cacheTime });

function getKeyFromRequest(req) {
  try {
    let key = req.originalUrl;
    key += JSON.stringify(req.body);
    return key;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

function getRes(req) {
  const key = getKeyFromRequest(req);
  if (key) {
    const data = cache.get(key);
    if (data) {
      return data;
    }
  }
  return null;
}

function setRes(req, data) {
  // logger.log("setInline")
  const key = getKeyFromRequest(req);
  return cache.set(key, data);
}

function set(req, res, next) {
  logger.info('set cache');
  const key = getKeyFromRequest(req);
  cache.set(key, res.locals.data);
  return next();
}

function get(req, res, next) {
  const key = getKeyFromRequest(req);
  const content = cache.get(key);
  if (content) {
    return res.status(200).jsonp(content);
  }
  return next();
}

module.exports = {
  get, set, getRes, setRes,
};
