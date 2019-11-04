import * as React from 'react';
import { List } from './list';
import { AddItem } from './add-item';
import { append } from 'ramda';

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

export const App = () => {
  const [words, setWords] = React.useState(initWords);

  return (
    <>
      <AddItem onAdd={(word: string) => setWords(append(word, words))} />
      <List words={words} />
    </>
  );
};
