import * as React from 'react';

import { TrainingManager, Storage } from '../services';
import { ImportReverso } from '../services/import-reverso';

import { Training } from './training/training';

import './app.scss';
export const App = () => {
  const storage = new Storage();
  storage.load();

  const manager = new TrainingManager(storage);

  (window as any).importReverso = new ImportReverso(storage);

  return <Training trainingManager={manager} />;
};
