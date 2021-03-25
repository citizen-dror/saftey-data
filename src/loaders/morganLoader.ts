
import morgan, { StreamOptions } from "morgan";

import logger from "../middlewares/logger";

// Override stream method, telling Morgan to logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => logger.http(message),
};

// Skip Morgan http log if not id dev mode 
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Define default message format string.
// message format is made from tokens, that are defined in the Morgan lib.

const loggerFormat = ':id :method :url :status :res[content-length] - :response-time ms';
morgan.token('id', function getId(req) {
  return (req as any).id
});

// Build morgan middleware
const morganMiddleware = morgan(
  loggerFormat,
  // Options: overwrote the stream and the skip logic.
  { stream, skip }
);

export default morganMiddleware;
