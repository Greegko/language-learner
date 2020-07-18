import { Training, Word, WordID } from "./interfaces";
import { adjust, __, merge } from "ramda";

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
    this.data.trainings.push(training);
  }

  addWord(word: Word) {
    this.data.words.push(word);
  }

  updateWord(wordId: WordID, word: Word) {
    const wordIndex = this.data.words.findIndex(x => x.id === wordId);
    this.data.words = adjust(wordIndex, merge(__, word), this.data.words);
  }

} 
