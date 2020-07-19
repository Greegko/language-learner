export type WordID = string;

export interface Word {
  id: WordID;
  word: string;
  translations: WordTranslation[];
}

export interface Example {
  example: string;
  exampleTranslation?: string;
}

export interface WordTranslation {
  translation: string;
  example?: Example;
}

export enum TrainingType { Discovery, Review };
export enum ReviewResult { Learned, Easy, Medium, Hard };

interface TrainingRecordBase {
  word: WordID;
  date: Date;
  type: TrainingType;
}

export interface TrainingDiscovery extends TrainingRecordBase {
  type: TrainingType.Discovery;
}

export interface TrainingReviewRecord extends TrainingRecordBase {
  type: TrainingType.Review;
  result: ReviewResult;
}

export type TrainingRecord = TrainingReviewRecord | TrainingDiscovery;
