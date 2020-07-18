export type WordID = string;

export interface Word {
  id: WordID;
  word: string;
  translations: WordTranslation[];
}

export interface Example {
  example: string;
  exampleTranslation: string;
}

export interface WordTranslation {
  translation: string;
  example?: Example;
}

export enum TrainingType { Learn };

export type TrainingID = string;

export interface Training {
  id: TrainingID;
  records: TrainingRecord[];
  date: Date;
}

export interface TrainingRecord {
  word: WordID;
  date: Date;
  type: TrainingType;
}

export interface TrainingLearnRecord extends TrainingRecord {
  type: TrainingType.Learn;
}
