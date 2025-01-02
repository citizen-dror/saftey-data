export default interface IMongoMatchQuery {
    $match?: {
      [key: string]: any; // Matches complex filter objects
    };
  }