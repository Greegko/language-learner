import * as shortid from "shortid";
import { append, values } from "ramda";


import { Word, TrainingRecord, WordID, Deck, DeckID } from "./interfaces";

interface StorageData {
  words: Record<WordID, Word>;
  decks: Record<DeckID, Deck>;
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
      this.data = { decks: {}, words: {} };
    }
  }

  getDeck(deckId: DeckID): Deck {
    return this.data.decks[deckId];
  }

  getAvailableDecks(): Deck[] {
    return values(this.data.decks);
  }

  getWord(wordId: WordID): Word {
    return this.data.words[wordId];
  }

  getWords(): Word[] {
    return values(this.data.words);
  }

  addTrainingRecord(deckId: DeckID, trainingRecord: TrainingRecord) {
    this.data.decks[deckId].trainingRecords = append(trainingRecord, this.data.decks[deckId].trainingRecords);
  }

  addWord(deckId: DeckID, word: Word) {
    this.data.words[word.id] = word;
    this.data.decks[deckId].words = append(word.id, this.data.decks[deckId].words);
  }

  addDeck(name: string): Deck {
    const deck = {
      id: shortid(),
      name,
      words: [],
      trainingRecords: []
    } as Deck;

    this.data.decks[deck.id] = deck;

    return deck;
  }

} 
