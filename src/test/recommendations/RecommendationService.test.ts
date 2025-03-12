import RecommendationService from '../../components/recommendations/recommendationService';
import RecommendationDAL from '../../components/recommendations/RecommendationDAL';

// Mock the RecommendationDAL module
jest.mock('../../components/recommendations/RecommendationDAL');

describe('RecommendationService', () => {
  let recommendationService: RecommendationService;
  let mockRecommendationDAL: jest.Mocked<RecommendationDAL>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Create a mocked instance of RecommendationDAL
    mockRecommendationDAL = new RecommendationDAL() as jest.Mocked<RecommendationDAL>;
    
    // Create an instance of RecommendationService with the mock
    recommendationService = new RecommendationService();
    
    // Replace the actual DAL instance with our mock
    (recommendationService as any).recommendationDAL = mockRecommendationDAL;
  });

  describe('getRecommendationsByTags', () => {
    it('should return recommendations when valid query is provided', async () => {
      const query = { lang: 'he', tags: ['אופניים', 'מכוניות'] };

      const mockRecommendations = [
        { title: 'Recommendation 1', category: 'Category 1', description: 'Description 1' },
        { title: 'Recommendation 2', category: 'Category 2', description: 'Description 2' }
      ];

      // Mock the recommendation_find method to return mock data
      mockRecommendationDAL.recommendation_find = jest.fn().mockResolvedValue(mockRecommendations);

      const result = await recommendationService.getRecommendationsByTags(query);
      
      expect(result).toEqual(mockRecommendations);
      expect(mockRecommendationDAL.recommendation_find).toHaveBeenCalledTimes(1);
      expect(mockRecommendationDAL.recommendation_find).toHaveBeenCalledWith(
        { lang: 'en', tags: { $in: ['tag1', 'tag2'] } }, 
        { title: 1, category: 1, description: 1 }
      );
    });

    it('should throw an error if recommendation_find fails', async () => {
      const query = { lang: 'he', tags: ['אופניים'] };
      
      // Mock the recommendation_find method to throw an error
      mockRecommendationDAL.recommendation_find = jest.fn().mockRejectedValue(new Error('Database error'));

      await expect(recommendationService.getRecommendationsByTags(query))
        .rejects
        .toThrow('Error getting recommendations: Database error');
    });
  });

  describe('getBestRecommendations', () => {
    it('should return best recommendations when valid query is provided', async () => {
      const accidentQu = { lang: 'he', vehicle: 'אופניים' };
      const mockBestRecommendations = [
        { title: 'Best Recommendation 1', category: 'Category 1', description: 'Best Description 1' }
      ];

      // Mock the getBestRecommendations method to return mock data
      mockRecommendationDAL.getBestRecommendations = jest.fn().mockResolvedValue(mockBestRecommendations);

      const result = await recommendationService.getBestRecommendations(accidentQu);
      
      expect(result).toEqual(mockBestRecommendations);
      expect(mockRecommendationDAL.getBestRecommendations).toHaveBeenCalledTimes(1);
      expect(mockRecommendationDAL.getBestRecommendations).toHaveBeenCalledWith(accidentQu);
    });

    it('should throw an error if getBestRecommendations fails', async () => {
      const accidentQu = { lang: 'he', vehicle: 'אופניים' };

      // Mock the getBestRecommendations method to throw an error
      mockRecommendationDAL.getBestRecommendations = jest.fn().mockRejectedValue(new Error('Database error'));

      await expect(recommendationService.getBestRecommendations(accidentQu))
        .rejects
        .toThrow('Error getBestRecommendations: Database error');
    });
  });

  describe('addRecommendation', () => {
    it('should add a recommendation and return the added recommendation', async () => {
      const recommendationData = { 
        title: 'New Recommendation',
        category: 'Category 1', 
        description: 'Description 1', 
        tags: ['tag1'],
        lang: 'he',
        references: [] 
      };
      const mockAddedRecommendation = { 
        ...recommendationData, 
        _id: '123', 
        creationDate: new Date(), 
        updateDate: new Date() 
      };

      // Mock the addRecommendation method to return mock added recommendation
      mockRecommendationDAL.addRecommendation = jest.fn().mockResolvedValue(mockAddedRecommendation);

      const result = await recommendationService.addRecommendation(recommendationData);
      
      expect(result).toEqual(mockAddedRecommendation);
      expect(mockRecommendationDAL.addRecommendation).toHaveBeenCalledTimes(1);
      expect(mockRecommendationDAL.addRecommendation).toHaveBeenCalledWith(recommendationData);
    });
  });

  describe('editRecommendation', () => {
    it('should edit a recommendation and return the updated recommendation', async () => {
      const recommendationData = { title: 'Updated Recommendation' };
      const mockUpdatedRecommendation = { 
        ...recommendationData, 
        _id: '123', 
        category: 'Category 1', 
        description: 'Description 1' 
      };

      // Mock the editRecommendation method to return the mock updated recommendation
      mockRecommendationDAL.editRecommendation = jest.fn().mockResolvedValue(mockUpdatedRecommendation);

      const result = await recommendationService.editRecommendation('123', recommendationData);
      
      expect(result).toEqual(mockUpdatedRecommendation);
      expect(mockRecommendationDAL.editRecommendation).toHaveBeenCalledTimes(1);
      expect(mockRecommendationDAL.editRecommendation).toHaveBeenCalledWith('123', recommendationData);
    });
  });

  describe('deleteRecommendation', () => {
    it('should delete a recommendation and return the deleted recommendation', async () => {
      const mockDeletedRecommendation = { 
        _id: '123', 
        title: 'Deleted Recommendation', 
        category: 'Category 1', 
        description: 'Description 1' 
      };

      // Mock the deleteRecommendation method to return the mock deleted recommendation
      mockRecommendationDAL.deleteRecommendation = jest.fn().mockResolvedValue(mockDeletedRecommendation);

      const result = await recommendationService.deleteRecommendation('123');
      
      expect(result).toEqual(mockDeletedRecommendation);
      expect(mockRecommendationDAL.deleteRecommendation).toHaveBeenCalledTimes(1);
      expect(mockRecommendationDAL.deleteRecommendation).toHaveBeenCalledWith('123');
    });
  });
});