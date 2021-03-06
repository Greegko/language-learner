import { useCallback, useEffect, useState } from 'react';
import { TrainingManager, TrainingTask } from '../../services';

import { LearningCard } from './learning-card';

interface TrainingPageParams {
  trainingManager: TrainingManager;
}

export const TrainingPage = ({ trainingManager }: TrainingPageParams) => {
  const [activeTrainingTask, setActiveTrainingTask] = useState<TrainingTask>(null);
  const [showResult, setShowResult] = useState<boolean>(null);
  const [hint, setHint] = useState<string>('');

  useEffect(() => {
    if(trainingManager.activeDeck){
      setActiveTrainingTask(trainingManager.getNextTask());
    }
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
    setActiveTrainingTask(trainingManager.getNextTask());
  }, [trainingManager.activeDeck])

  if (!trainingManager.activeDeck) {
    return <div>No deck selected!</div>;
  }

  if (!activeTrainingTask) {
    return <div>No remaining words!</div>;
  }

  return <LearningCard word={activeTrainingTask.word} showResult={showResult} hint={hint} solveAction={solveAction} nextWordAction={getNewTask} />;
}
