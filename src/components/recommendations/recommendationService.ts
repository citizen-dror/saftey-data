import RecommendationDAL from './RecommendationDAL';
import iRecommendTagsQuery from './iRecommendQuery';
import iAccidentRecomandQuery from './iAccidentRecomandQuery';

class RecommendationService {
    // Method to get recommendations based on the iRecommendQuery input
    public getRecommendationsByTags = async (query: iRecommendTagsQuery) => {
      try {
        // Prepare filter from the query object
        const filter: any = { lang: query.lang };
  
        if (query.tags) {
          filter.tags = { $in: query.tags }; // Ensure tags are in the array
        }
  
        // if (query.category) {
        //   filter.category = query.category;
        // } else {
        //   filter.category = { $exists: true }; // Default to all categories if not provided
        // }
  
        // Set default projection fields (title, category, description)
        const projection = { title: 1, category: 1, description: 1 };
  
        // Call DAL method to find recommendations based on the constructed filter
        const recommendations = await RecommendationDAL.recommendation_find(filter, projection);
        return recommendations;
      } catch (error) {
        // Handle any potential errors
        throw new Error(`Error getting recommendations: ${error.message}`);
      }
    }
    public getBestRecommendations = async (accidentQu: iAccidentRecomandQuery) =>{
      try {
        // Call DAL method to find recommendations based on the constructed filter
        const recommendations = await RecommendationDAL.getBestRecommendations(accidentQu);
        return recommendations;
      } catch (error) {
        // Handle any potential errors
        throw new Error(`Error getBestRecommendations: ${error.message}`);
      }
    }
  }

export default new RecommendationService();
