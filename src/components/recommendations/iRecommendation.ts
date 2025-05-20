import mongoose from 'mongoose';

export interface iRecommendation {
    _id: string | mongoose.Types.ObjectId;
    title: string;
    category: string;
    description: string;
    tags: TagScore[];
    language?: string;
    lang: string;
    references: Reference[];
    creationDate: Date;
    updateDate: Date;
  }

 export interface TagScore {
    name: string;
    score: number;
  }

  export interface Reference {
    title: string;
    url: string;
  }