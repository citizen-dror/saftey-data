import { Router, Request, Response } from 'express';
import RecommendationService from './recommendationService'; // import the service
import iRecommendTagsQuery from './iRecommendQuery'; // import the interface
import iAccidentRecomandQuery from './iAccidentRecomandQuery'; 
import auth from '../../middlewares/auth';
import { UserRole } from '../users/roles';
const router = Router();

  // Controller to recommendations
const recommendationRoute = (app: Router) => {
  app.use('/api/v1/recommendations', router);
  const recommendationService = new RecommendationService();

  //get recommendations by lang and tags
  router.get('/tags/', async (req: Request, res: Response) => {
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
      const recommendations = await recommendationService.getRecommendationsByTags(queryObject);

      // Return the recommendations in the response
      return res.json(recommendations);
    } catch (error) {
      // Handle any potential errors
      return res.status(500).json({ error: error.message });
    }
  });

   //get best recommendations by lang ans score
   router.get('/', async (req: Request, res: Response) => {
    try {
      // Construct query object based on request query parameters
      const queryObject: iAccidentRecomandQuery = {
        lang: req.query.lang as string, 
        vehicle: req.query.vcl as string, 
        ...(req.query.rt ? { roadType: req.query.rt as string } : {})
      };
      // Call the service method to get recommendations
      const recommendations = await recommendationService.getBestRecommendations(queryObject);
      // Return the recommendations in the response
      return res.json(recommendations);
    } catch (error) {
      // Handle any potential errors
      return res.status(500).json({ error: error.message });
    }
  });

  // add recommendation
  router.post('/', auth([UserRole.ADMIN, UserRole.EDITOR]), async (req: Request, res: Response) => {
    try {
      const recommendation = await recommendationService.addRecommendation(req.body);
      res.status(201).json(recommendation);
    } catch (error) {
      res.status(500).json({ message: 'Error adding recommendation', error });
    }
  });
  // edit recommendation
  router.put('/:id',auth([UserRole.ADMIN, UserRole.EDITOR]),  async (req: Request, res: Response) => {
    try {
      const updatedRecommendation = await recommendationService.editRecommendation(req.params.id, req.body);
      if (!updatedRecommendation) {
        return res.status(404).json({ message: 'Recommendation not found' });
      }
      res.json(updatedRecommendation);
    } catch (error) {
      res.status(500).json({ message: 'Error editing recommendation', error });
    }
  });
  // delete recommendation
  router.delete('/:id',auth([UserRole.ADMIN, UserRole.EDITOR]), async (req: Request, res: Response) => {
    try {
      const deletedRecommendation = await recommendationService.deleteRecommendation(req.params.id);
      if (!deletedRecommendation) {
        return res.status(404).json({ message: 'Recommendation not found' });
      }
      res.json({ message: 'Recommendation deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting recommendation', error });
    }
  });
  
};

export default recommendationRoute;
