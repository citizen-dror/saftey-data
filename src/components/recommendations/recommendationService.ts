import RecommendationDAL from './RecommendationDAL';
import iRecommendTagsQuery from './iRecommendQuery';
import iAccidentRecomandQuery from './iAccidentRecomandQuery';
import { iRecommendation } from './iRecommendation';

class RecommendationService {
  private dal = new RecommendationDAL();
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
        const recommendations = await this.dal.recommendation_find(filter, projection);
        return recommendations;
      } catch (error) {
        // Handle any potential errors
        throw new Error(`Error getting recommendations: ${error.message}`);
      }
    }
    public getBestRecommendations = async (accidentQu: iAccidentRecomandQuery) =>{
      try {
        // Call DAL method to find recommendations based on the constructed filter
        const recommendations = await this.dal.getBestRecommendations(accidentQu);
        return recommendations;
      } catch (error) {
        // Handle any potential errors
        throw new Error(`Error getBestRecommendations: ${error.message}`);
      }
    }

    async addRecommendation(data: Omit<iRecommendation, '_id' | 'creationDate' | 'updateDate'>): Promise<iRecommendation> {
      return this.dal.addRecommendation(data);
    }
  
    async editRecommendation(id: string, data: Partial<Omit<iRecommendation, '_id' | 'updateDate'>>): Promise<iRecommendation | null> {
      return this.dal.editRecommendation(id, data);
    }

    async deleteRecommendation(id: string): Promise<iRecommendation | null> {
      return this.dal.deleteRecommendation(id);
    }
  }

export default RecommendationService;
