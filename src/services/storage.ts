import { adjust, __, merge, append } from "ramda";

import { Training, Word, WordID } from "./interfaces";

interface StorageData {
  trainings: Training[];
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
      this.data = { trainings: [], words: [] };
    }
  }

  getTrainings(): Training[] {
    return this.data.trainings;
  }

  getWords(): Word[] {
    return this.data.words;
  }

  addTraining(training: Training) {
    this.data.trainings = append(training, this.data.trainings);
  }

  addWord(word: Word) {
    this.data.words = append(word, this.data.words);
  }

  updateWord(wordId: WordID, word: Word) {
    const wordIndex = this.data.words.findIndex(x => x.id === wordId);
    this.data.words = adjust(wordIndex, merge(__, word), this.data.words);
  }

} 
