import helmet from 'helmet';

const helmetLoder = async ({ app }) => {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': ["'self'", '*.tile.openstreetmap.org', 'data:'],
      },
    }),
  );
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true, // Apply to subdomains as well
    preload: true // Optionally add the preload directive for browsers
  }));
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());
  // app.use(helmet());
};

export default helmetLoder;
