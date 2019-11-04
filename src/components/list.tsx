import * as React from 'react';

interface ListParams {
  words: string[];
}

export const List = ({ words }: ListParams) => (
  <ul>
    {words.map(word => <li key={word}>{word}</li>)}
  </ul>
);
