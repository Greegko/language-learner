import * as React from 'react';
import { Training } from './training/training';
import { TrainingManager, WordsManager, Storage } from '../services';

export const App = () => {
  const storage = new Storage();
  storage.load();

  const wordsManager = new WordsManager(storage);
  const manager = new TrainingManager(wordsManager);

  const session = manager.startNewTraining();

  return <Training session={session} wordsManager={wordsManager} />;
};
