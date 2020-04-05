import * as React from 'react';
import { SearchItem } from './search';
import { WordReference } from '../../../services/word-reference';

export const SearchList = () => {
  const [words, setWords] = React.useState([]);

  const onSearch = (word: string) => {
    const wordReference = new WordReference();
    wordReference.getWord(word).then(x => console.log(x));
  }

  return (
    <ul className="list">
      <SearchItem onSearch={onSearch}></SearchItem>
      {words.map(word => <Word word={word} />)}
    </ul>
  );
};


const Word = ({ word }: { word: string }) => (
  <ul className="list">
    <li className="list-item">
      <div className="list-item__center">
        <div className="list-item__title">
          {word}
        </div>
        <div className="list-item__subtitle">
          Subtitle
        </div>
        <div className="list-item__subtitle">
          Subtitle
        </div>
      </div>
      <div className="list-item__right">
        <div className="list-item__label">Szek</div>
      </div>
    </li>
  </ul>
);
