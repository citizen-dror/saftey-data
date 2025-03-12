export interface iRecommendation {
    _id: string;
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