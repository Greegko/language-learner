import { Word, Example, WordID } from "./interfaces";
import { generate as generateShortid } from "shortid";
import { Storage } from "./storage";

export class WordsManager {

  constructor(storage: Storage) {
    this.words = storage.getWords();
  }

  private words: Word[] = [];

  addWord(word: string, translation: string, example?: Example): void {
    const id = generateShortid();
    this.words.push({
      id,
      word,
      translations: [{
        translation,
        example
      }]
    });
  }

  getWords(): Word[] {
    return this.words;
  }

  getWord(wordId: WordID): Word {
    return this.words.find(x => x.id === wordId);
  }

}
