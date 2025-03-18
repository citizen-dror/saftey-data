import mongoose from 'mongoose';

export interface iRecommendation {
    _id: string | mongoose.Types.ObjectId;
    title: string;
    category: string;
    description: string;
    tags: string[];
    language?: string;
    lang: string;
    references: Reference[];
    creationDate: Date;
    updateDate: Date;
  }

  export interface Reference {
    title: string;
    url: string;
  }