import RedisClient from '../../infrastructure/redisClient';
import RecommendationDAL from './RecommendationDAL';
import iRecommendTagsQuery from './iRecommendQuery';
import iAccidentRecomandQuery from './iAccidentRecomandQuery';
import { iRecommendation } from './iRecommendation';

class RecommendationService {
  //private dal = new RecommendationDAL();
  private redisClient = RedisClient.getClient();
  private redisEnabled = !!this.redisClient;
  constructor(
    private dal: RecommendationDAL,
  ) {
    
  }

  private async clearCache() {
    if (!this.redisEnabled) return;

    try {
      const keys = await this.redisClient?.keys('recommendations:*');
      if (keys && keys.length > 0) {
        await this.redisClient?.del(keys);
      }
    } catch (error) {
      console.error('Error clearing specific cache:', error);
    }
  }

public getRecommendationsByTags = async (query: iRecommendTagsQuery) => {
  try {
    const cacheKey = `recommendations:${query.lang}:${query.tags?.join(',') || 'all'}`;

    if (this.redisEnabled) {
      const cachedData = await this.redisClient?.get(cacheKey);
      if (cachedData) return JSON.parse(cachedData);
    }

    const pipeline: any[] = [
      { $match: { lang: query.lang } }
    ];

    if (query.tags?.length) {
      pipeline.push(
        { $match: { "tags.name": { $in: query.tags } } },
        {
          $addFields: {
            maxMatchingScore: {
              $max: {
                $map: {
                  input: {
                    $filter: {
                      input: "$tags",
                      as: "tag",
                      cond: { $in: ["$$tag.name", query.tags] }
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
      );
    }

    const recommendations = await this.dal.recommendation_aggregate(pipeline);

    if (this.redisEnabled) {
      await this.redisClient?.set(cacheKey, JSON.stringify(recommendations), 'EX', 600);
    }

    return recommendations;
  } catch (error) {
    console.error(`Error getting recommendations: ${error.message}`);
    return [];
  }
};


  public getBestRecommendations = async (accidentQu: iAccidentRecomandQuery) => {
    try {
      const cacheKey = `best_recommendations:${JSON.stringify(accidentQu)}`;
      if (this.redisEnabled) {
        const cachedData = await this.redisClient?.get(cacheKey);
        if (cachedData) return JSON.parse(cachedData);
      }

      const recommendations = await this.dal.getBestRecommendations(accidentQu);

      if (this.redisEnabled) {
        await this.redisClient?.set(cacheKey, JSON.stringify(recommendations), 'EX', 600);
      }

      return recommendations;
    } catch (error) {
      console.error(`Error getBestRecommendations: ${error.message}`);
      return [];
    }
  };

  async addRecommendation(data: Omit<iRecommendation, '_id' | 'creationDate' | 'updateDate'>): Promise<iRecommendation> {
    const recommendation = await this.dal.addRecommendation(data);
    await this.clearCache();
    return recommendation;
  }

  async editRecommendation(id: string, data: Partial<Omit<iRecommendation, '_id' | 'updateDate'>>): Promise<iRecommendation | null> {
    const updatedRecommendation = await this.dal.editRecommendation(id, data);
    await this.clearCache();
    return updatedRecommendation;
  }

  async deleteRecommendation(id: string): Promise<iRecommendation | null> {
    const deletedRecommendation = await this.dal.deleteRecommendation(id);
    await this.clearCache();
    return deletedRecommendation;
  }
}

export default RecommendationService;
