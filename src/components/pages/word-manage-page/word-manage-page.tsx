import * as React from 'react';
import { List } from './list';
import { AddItem } from './add-item';
import { Page } from 'react-onsenui';

interface WordManagePageProps {
  words: string[];
  addWord: (word: string) => void;
}

export const WordManagePage = ({ words, addWord }: WordManagePageProps) => (
  <Page>
    <AddItem onAdd={(word: string) => addWord(word)} />
    <List words={words} />
  </Page>
);
