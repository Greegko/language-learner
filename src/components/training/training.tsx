import * as React from 'react';

import { TrainingManager } from '../../services';

import { LearningCard } from './learning-card';

interface TrainingParams {
  trainingManager: TrainingManager;
}

export const Training = ({ trainingManager }: TrainingParams) => {
  const task = trainingManager.getTask();

  if (!task) {
    return <div>No remaining words!</div>;
  }

  const solve = () => trainingManager.solveTask();

  return <LearningCard solve={solve} word={task.word} />;
}

