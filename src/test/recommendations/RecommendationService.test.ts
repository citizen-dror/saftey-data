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
    recommendationService = new RecommendationService(mockRecommendationDAL);
  });

  describe('getRecommendationsByTags', () => {
    it('should return recommendations when valid query is provided', async () => {
      const query = { lang: 'he', tags: ['tag1', 'tag2'] };

      const mockRecommendations = [
      {
        title: 'Recommendation 1',
        category: 'Category 1',
        description: 'Description 1',
        tags: [
          { name: 'tag1', score: 90 },
          { name: 'tag3', score: 50 }
        ]
      },
      {
        title: 'Recommendation 2',
        category: 'Category 2',
        description: 'Description 2',
        tags: [
          { name: 'tag2', score: 80 },
          { name: 'tag4', score: 40 }
        ]
      }
    ];

      // Mock the recommendation_aggregate method to return mock data
      //mockRecommendationDAL.recommendation_aggregate = jest.fn().mockResolvedValue(mockRecommendations);
      mockRecommendationDAL.recommendation_aggregate.mockResolvedValue(mockRecommendations);

      const result = await recommendationService.getRecommendationsByTags(query);

      expect(result).toEqual(mockRecommendations);
      expect(mockRecommendationDAL.recommendation_aggregate).toHaveBeenCalledTimes(1);
      expect(mockRecommendationDAL.recommendation_aggregate).toHaveBeenCalledWith([
        { $match: { lang: 'he' } },
        { $match: { "tags.name": { $in: ['tag1', 'tag2'] } } },
        {
          $addFields: {
            maxMatchingScore: {
              $max: {
                $map: {
                  input: {
                    $filter: {
                      input: "$tags",
                      as: "tag",
                      cond: { $in: ["$$tag.name", ['tag1', 'tag2']] }
                    }
                  },
                  as: "match",
                  in: "$$match.score"
                }
              }
            }
          }
        },
        { $sort: { maxMatchingScore: -1 } }
      ]);
    });

    it('should return empty array if recommendation_aggregate fails', async () => {
      const query = { lang: 'he', tags: ['אופניים'] };

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockRecommendationDAL.recommendation_aggregate = jest.fn().mockRejectedValue(new Error('Database error'));

      const result = await recommendationService.getRecommendationsByTags(query);

      expect(result).toEqual([]);

      consoleErrorSpy.mockRestore(); // Clean up
    });
  });

  // describe('getBestRecommendations', () => {
  //   it('should return best recommendations when valid query is provided', async () => {
  //     const accidentQu = { lang: 'he', vehicle: 'אופניים' };
  //     const mockBestRecommendations = [
  //       { title: 'Best Recommendation 1', category: 'Category 1', description: 'Best Description 1' }
  //     ];

  //     // Mock the getBestRecommendations method to return mock data
  //     mockRecommendationDAL.getBestRecommendations = jest.fn().mockResolvedValue(mockBestRecommendations);

  //     const result = await recommendationService.getBestRecommendations(accidentQu);

  //     expect(result).toEqual(mockBestRecommendations);
  //     expect(mockRecommendationDAL.getBestRecommendations).toHaveBeenCalledTimes(1);
  //     expect(mockRecommendationDAL.getBestRecommendations).toHaveBeenCalledWith(accidentQu);
  //   });

  //   it('should return empty array if getBestRecommendations fails', async () => {
  //     const accidentQu = { lang: 'he', vehicle: 'אופניים' };

  //     // Mock the getBestRecommendations method to throw an error
  //     mockRecommendationDAL.getBestRecommendations = jest.fn().mockRejectedValue(new Error('Database error'));

  //     const result = await recommendationService.getBestRecommendations(accidentQu);

  //     expect(result).toEqual([]);
  //   });
  // });

  describe('addRecommendation', () => {
    it('should add a recommendation and return the added recommendation', async () => {
      const recommendationData = {
        title: 'New Recommendation',
        category: 'Category 1',
        description: 'Description 1',
        tags: [{ name: 'tag1', score: 100 }],
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
