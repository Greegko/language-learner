enum Language { English, French };

export interface Word {
  word: string;
  meaning: string;
  sourceLanguage: Language;
  targetLanguage: Language;
}
