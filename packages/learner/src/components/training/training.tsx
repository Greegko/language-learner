import { useCallback, useEffect, useState } from 'react';
import { TrainingManager, TrainingTask } from '../../services';

import { LearningCard } from './learning-card';

interface TrainingParams {
  trainingManager: TrainingManager;
}

export const Training = ({ trainingManager }: TrainingParams) => {
  const [activeTrainingTask, setActiveTrainingTask] = useState<TrainingTask>(null);
  const [showResult, setShowResult] = useState<boolean>(null);
  const [hint, setHint] = useState<string>('');

  useEffect(() => {
    setActiveTrainingTask(trainingManager.activeTask);
  }, []);

  const solveAction = useCallback((solution: string) => {
    const success = trainingManager.solveTask(activeTrainingTask, solution);

    if(success) {
      setShowResult(true);
      setTimeout(() => {
        getNewTask();
      }, 1500);

    } else {
      setHint(activeTrainingTask.word.word);
    }
  }, [activeTrainingTask])
  
  const getNewTask = useCallback(() => {
    setShowResult(false);
    setHint('');
    setActiveTrainingTask(trainingManager.activeTask);
  }, [trainingManager.activeTask])

  if (!activeTrainingTask) {
    return <div>No remaining words!</div>;
  }

  return <LearningCard word={activeTrainingTask.word} showResult={showResult} hint={hint} solveAction={solveAction} nextWordAction={getNewTask} />;
}
