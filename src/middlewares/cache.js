const NodeCache = require('node-cache')

// stdTTL: time to live in seconds for every generated cache element.
const cacheTime = 7*24* 60* 60;
const cache = new NodeCache({ stdTTL: cacheTime })

function getKeyFromRequest(req) {
  try {
    let key = req.originalUrl;
    key+= JSON.stringify(req.body);
    return key
  }
  catch(error) {
    console.error(error);
  }
}

function set1(req, data) {
  //console.log("set cache1")
  const key = getKeyFromRequest(req)
  cache.set(key, data)
 //return next()
}

function set(req, res, next) {
  console.log("set cache")
  const key = getKeyFromRequest(req)
  cache.set(key, res.locals.data)
  return next()
}

function get(req, res, next) {
  const key = getKeyFromRequest(req)
  const content = cache.get(key)
  if (content) {
    return res.status(200).jsonp(content)
  }
  return next()
}

module.exports = { get, set, set1 }
