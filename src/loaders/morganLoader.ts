
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

// Build morgan middleware
const morganMiddleware = morgan(
  // Define default message format string.
  // message format is made from tokens, that are defined in the Morgan lib.
  ":method :url :status :res[content-length] - :response-time ms",
  // Options: overwrote the stream and the skip logic.
  { stream, skip }
);

export default morganMiddleware;
