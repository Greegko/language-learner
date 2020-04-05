import { Word } from "./interfaces";
import { firebaseApp } from "./database";

export class WordsManager {
  private collection = firebaseApp.firestore().collection('words');

  addWord(word: Word): void {
    this.collection.add(word);
  }

  getWords(): Promise<Word[]> {
    return this.collection.get().then(x => x.docs[0].data).then(x => (console.log(x), []));
  }
}
