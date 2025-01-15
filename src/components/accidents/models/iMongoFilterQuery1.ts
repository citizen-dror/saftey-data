export default interface IMongoFilterQuery {
  $match?: {
    [key: string]: any; // Matches complex filter objects
  };
  $group?: {
    _id: string | { [key: string]: string }; // Grouping key(s)
    [key: string]: any; // Additional group fields
  };
  $sort?: {
    [key: string]: 1 | -1; // Ascending or Descending sort
  };
  $limit?: number; // Optional limit stage
  $skip?: number; // Optional skip stage
  [key: string]: any; // Additional aggregation stages
}