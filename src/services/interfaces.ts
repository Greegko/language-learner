export enum Language { English, French };

export interface AutocompleteWord {
  word: string;
  language: Language;
}

export interface Word {
  word: string;
  meaning: string;
  sourceLanguage: Language;
  targetLanguage: Language;
}
