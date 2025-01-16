import { Request as ExpressRequest } from 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request extends ExpressRequest {
      requestId?: string; // Add the requestId property from express-request-id
    }
  }
}