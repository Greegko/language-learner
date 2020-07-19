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

export enum TrainingType { Learn };
export enum LearnRecordResult { Learned, Easy, Medium, Hard };

export interface TrainingRecord {
  word: WordID;
  date: Date;
  type: TrainingType;
}

export interface TrainingLearnRecord extends TrainingRecord {
  type: TrainingType.Learn;
  result: LearnRecordResult;
}
