const RecommendationModel = require('./recommendation');
import iAccidentRecomandQuery from './iAccidentRecomandQuery'; 

class RecommendationDAL {
  public recommendation_find = (filter: any, proj: any) => {
        return RecommendationModel.find(filter); // Fetch all documents
  }
  public getBestRecommendations = async (accidentQu: iAccidentRecomandQuery) => {
    return RecommendationModel.aggregate([
      {
        $addFields: {
          score: {
            $sum: [
              { $cond: [{ $in: [accidentQu.vehicle, "$tags"] }, 50, 0] },  // Changed from vehicle to "אופנועים" with else value of 1
              { $cond: [{ $in: ["מיתון תנועה", "$tags"] }, 15, 0] }  // Added the second condition for traffic calming
            ]
          }
        }
        // $addFields: {
        //   score: {
        //     $sum: [
        //       { $cond: [{ $in: [accidentQu.vehicle, "$tags"] }, 50, 2] }  // High weight: Vehicle type
        //       //{ $cond: [{ $in: [[accidentQu.roadType], "$tags"] }, 30, 0] },  // Medium weight: Road type
        //       //{ $cond: [{ $in: [["מיתון תנועה"], "$tags"] }, 15, 0] }   // Boost general safety measures
        //     ]
        //   }
        // }
      },
      { $sort: { score: -1 } },  // Sort by highest score
      { $limit: 5 } // Get top 5 recommendations
    ]);
  };
}

export default new RecommendationDAL();
