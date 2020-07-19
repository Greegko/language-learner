import { append } from "ramda";

import { Word, TrainingRecord } from "./interfaces";

interface StorageData {
  trainingRecords: TrainingRecord[];
  words: Word[];
}

export class Storage {

  private data: StorageData;

  save() {
    localStorage.setItem('languageLearner', JSON.stringify(this.data));
  }

  load() {
    const parsedData = JSON.parse(localStorage.getItem('languageLearner'));
    if (parsedData) {
      this.data = parsedData;
    } else {
      this.data = { trainingRecords: [], words: [] };
    }
  }

  getTrainingRecords(): TrainingRecord[] {
    return this.data.trainingRecords;
  }

  getWords(): Word[] {
    return this.data.words;
  }

  addTrainingRecord(trainingRecord: TrainingRecord) {
    this.data.trainingRecords = append(trainingRecord, this.data.trainingRecords);
  }

  addWord(word: Word) {
    this.data.words = append(word, this.data.words);
  }

} 
