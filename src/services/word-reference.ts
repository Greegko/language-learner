const DEFINITION_URL = 'https://www.wordreference.com/fren/';
// const AUTOCOMPLETE_URL = "https://www.wordreference.com/2012/autocomplete/autocomplete.aspx?dict=fren&query=";

const get = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.responseText;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        resolve(xhr.responseText);
      }
    }
  });
}

export class WordReference {
  getWord(word: string): Promise<Document> {
    return this.loadResourceForWord(word)
    // .then(document => {
    //   return {} as Word;
    // });
  }

  private getHTML(word: string): Promise<string> {
    return get(DEFINITION_URL + word);
  }

  private getDOM(html: string): Document {
    return (new DOMParser()).parseFromString(html, 'text/html');
  }

  private loadResourceForWord(word: string): Promise<Document> {
    return this.getHTML(word)
      .then(html => this.getDOM(html));
  }
}
