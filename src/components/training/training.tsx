import * as React from 'react';

import { TrainingManager } from '../../services';

import { LearningCard } from './learning-card';
import { Word } from '../../services/interfaces';

interface TrainingParams {
  trainingManager: TrainingManager;
}

export const Training = ({ trainingManager }: TrainingParams) => {
  const [activeWord, setActiveWord] = React.useState<Word>(null);

  React.useEffect(() => {
    setActiveWord(trainingManager.activeTask.word);
  }, []);

  const solve = () => {
    trainingManager.solveActiveTask();

    setActiveWord(trainingManager.activeTask.word);
  }

  if (!activeWord) {
    return <div>No remaining words!</div>;
  }

  return <LearningCard solve={solve} word={activeWord} />;
}
