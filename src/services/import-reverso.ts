import { generate as generateShortid } from "shortid";

import { Storage } from "./storage";

interface ReversoFavourite {
  srcText: string;
  trgText: string;
  srcLang: string;
  trgLang: string;
  srcSegment: string;
}

export class ImportReverso {
  constructor(private storage: Storage) { }

  importFromFavourite(data: ReversoFavourite[]) {
    for (let record of data) {
      this.storage.addWord({
        id: generateShortid(),
        word: record.srcText,
        translations: [{ translation: record.trgText, example: { example: record.srcSegment } }]
      });
    }

    this.storage.save();
  }

}