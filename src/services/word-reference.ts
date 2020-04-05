import { Word } from './interfaces';

const URL = 'https://www.wordreference.com/fren/';

export class WordReference {
  private getHTML(word: string): Promise<string> {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', URL + word);
      xhr.send();

      xhr.responseText;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          resolve(xhr.responseText);
        }
      }
    });
  }

  private getDOM(html: string): Document {
    return (new DOMParser()).parseFromString(html, 'text/html');
  }

  private loadResourceForWord(word: string): Promise<Document> {
    return this.getHTML(word)
      .then(html => this.getDOM(html));
  }

  getWord(word: string): Promise<Word> {
    return this.loadResourceForWord(word)
      .then(document => {
        return {} as Word;
      });
  }
}
