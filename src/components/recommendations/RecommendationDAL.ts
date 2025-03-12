const RecommendationModel = require('./recommendation');
import mongoose from 'mongoose';
import iAccidentRecomandQuery from './iAccidentRecomandQuery'; 
import { iRecommendation } from './iRecommendation';

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

  async addRecommendation(data: Omit<iRecommendation, '_id' | 'creationDate' | 'updateDate'>): Promise<iRecommendation> {
    try {
      const recommendation = new RecommendationModel({
        _id: new mongoose.Types.ObjectId(),
        ...data,
        creationDate: new Date(),
        updateDate: new Date(),
      });
      return await recommendation.save();
    } catch (error) {
      console.error('Error adding recommendation:', error);
      throw error;
    }
  }

  async editRecommendation(id: string, data: Partial<Omit<iRecommendation, '_id' | 'updateDate'>>): Promise<iRecommendation> {
    try {
      const updatedRecommendation = await RecommendationModel.findByIdAndUpdate(
        id,
        { ...data, updateDate: new Date() },
        { new: true, runValidators: true }
      );
      return updatedRecommendation;
    } catch (error) {
      console.error('Error editing recommendation:', error);
      throw error;
    }
  }

  async deleteRecommendation(id: string): Promise<iRecommendation | null> {
    try {
      return await RecommendationModel.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting recommendation:', error);
      throw error;
    }
  }
}

export default RecommendationDAL;
