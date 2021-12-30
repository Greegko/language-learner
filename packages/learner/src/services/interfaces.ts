export type WordID = string;

export interface Word {
  id: WordID;
  word: string;
  translations: WordTranslation[];
}

export type DeckID = string;

export type Deck = {
  id: DeckID;
  trainingRecords: TrainingRecord[];
  words: WordID[]
}

export interface Example {
  example: string;
  exampleTranslation?: string;
}

export interface WordTranslation {
  translation: string;
  example?: Example;
}

export enum TrainingRecordType { Attempt, Success };

export interface TrainingRecordAttempt {
  wordId: WordID;
  date: Date;
  type: TrainingRecordType.Attempt;
  attempt: string;
}

export interface TrainingRecordSuccess {
  wordId: WordID;
  date: Date;
  type: TrainingRecordType.Success;
}

export type TrainingRecord = TrainingRecordAttempt | TrainingRecordSuccess;
