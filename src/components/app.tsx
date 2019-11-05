import * as React from 'react';
import { WordManagePage } from './pages';
import append from 'ramda/es/append';

const initWords = [
  "assoir",
  "marché",
  "acheter",
  "prandre",
  "oublier",
  "merde",
  "Bon chance!",
  "Je t'aime",
  "aimer"
];

import 'onsenui/css/onsenui-core.css';
import 'onsenui/css/onsen-css-components.min.css';

export const App = () => {
  const [words, setWords] = React.useState(initWords);

  return (
    <WordManagePage words={words} addWord={(word: string) => setWords(append(word, words))} />
  );
};