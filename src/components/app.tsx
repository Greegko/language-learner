import * as React from 'react';

import { TrainingManager, WordsManager, Storage } from '../services';
import { ImportReverso } from '../services/import-reverso';

import { Training } from './training/training';

export const App = () => {
  const storage = new Storage();
  storage.load();

  const wordsManager = new WordsManager(storage);
  const manager = new TrainingManager(wordsManager);

  const session = manager.startNewTraining();

  (window as any).importReverso = new ImportReverso(storage);

  return <Training session={session} wordsManager={wordsManager} />;
};
