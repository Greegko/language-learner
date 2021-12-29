const data = require('./dictionary-dump.json') as DictionaryWord[];

export interface DictionaryWord {
  word: string;
  type: "word" | "expression";
  translation?: string;
  definition?: string;
  example?: string;
  tags?: string[];
}

export class Dictionary {

  search(query: string): DictionaryWord[] {
    return query !== "" ? data.filter(x => x.word.indexOf(query) !== -1) : [];
  }

}
