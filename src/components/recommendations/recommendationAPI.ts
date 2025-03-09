import { Router, Request, Response } from 'express';
import RecommendationService from './recommendationService'; // import the service
import iRecommendTagsQuery from './iRecommendQuery'; // import the interface
import iAccidentRecomandQuery from './iAccidentRecomandQuery'; 
const route = Router();

  // Controller to recommendations
const recommendationRoute = (app: Router) => {
  app.use('/api/v1/recommendations', route);

  //get recommendations by lang and tags
  route.get('/tags/', async (req: Request, res: Response) => {
    try {
      // Construct query object based on tags and lang
      const queryObject: iRecommendTagsQuery = {
        lang: req.query.lang as string, 
        tags: req.query.tags 
        ? (typeof req.query.tags === 'string' ? req.query.tags.split(',') : []) 
        : undefined,
        category: req.query.category as string || undefined,
      };

      // Call the service method to get recommendations
      const recommendations = await RecommendationService.getRecommendationsByTags(queryObject);

      // Return the recommendations in the response
      return res.json(recommendations);
    } catch (error) {
      // Handle any potential errors
      return res.status(500).json({ error: error.message });
    }
  });

   //get best recommendations by lang ans score
  route.get('/', async (req: Request, res: Response) => {
    try {
      // Construct query object based on request query parameters
      const queryObject: iAccidentRecomandQuery = {
        lang: req.query.lang as string, 
        vehicle: req.query.vcl as string, 
        ...(req.query.rt ? { roadType: req.query.rt as string } : {})
      };
      // Call the service method to get recommendations
      const recommendations = await RecommendationService.getBestRecommendations(queryObject);
      // Return the recommendations in the response
      return res.json(recommendations);
    } catch (error) {
      // Handle any potential errors
      return res.status(500).json({ error: error.message });
    }
  });
};

export default recommendationRoute;
