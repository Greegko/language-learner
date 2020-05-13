import { Word } from "./interfaces";

export class WordsManager {
  private words: Word[] = [];

  addWord(word: Word): void {
    this.words.push(word);
  }

  getWords(): Word[] {
    return [];
  }
}
