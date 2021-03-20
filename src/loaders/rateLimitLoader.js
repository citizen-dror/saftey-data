const rateLimit = require('express-rate-limit');

const limitMainFilter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many accounts created from this IP, please try again after a minute',
});
const limitAll = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: 'Too many accounts created from this IP, please try again after a minute',
});

const rateLimitLoader = async ({ app }) => {
  app.use('/api/v1/accident', limitMainFilter);
  app.use(limitAll);

  return app;
};

module.exports = rateLimitLoader;
