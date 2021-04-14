import { useEffect, useState } from 'react';
import { TrainingManager, TrainingTask } from '../../services';

import { LearningCard } from './learning-card';

interface TrainingParams {
  trainingManager: TrainingManager;
}

export const Training = ({ trainingManager }: TrainingParams) => {
  const [activeTrainingTask, setActiveTrainingTask] = useState<TrainingTask>(null);

  useEffect(() => {
    setActiveTrainingTask(trainingManager.activeTask);
  }, []);

  const solve = (res: any) => {
    trainingManager.solveActiveTask(res);

    setActiveTrainingTask(trainingManager.activeTask);
  }

  if (!activeTrainingTask) {
    return <div>No remaining words!</div>;
  }

  return <LearningCard solve={solve} word={activeTrainingTask.word} taskType={activeTrainingTask.trainingType} />;
}
