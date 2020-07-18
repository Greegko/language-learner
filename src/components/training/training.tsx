import * as React from 'react';

import { TrainingSession, WordsManager } from '../../services';

import { LearningCard } from './learning-card';

interface TrainingParams {
  session: TrainingSession;
  wordsManager: WordsManager;
}

export const Training = ({ session, wordsManager }: TrainingParams) => {

  const task = session.getActiveTask();

  if (!task) {
    return <div>No remaining words!</div>;
  }

  const word = wordsManager.getWord(task.word);

  const solve = () => session.solveActiveTask();

  return <LearningCard solve={solve} word={word} />;
}

