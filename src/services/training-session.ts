import { head } from 'ramda';
import { generate as generateShortid } from 'shortid';
import { Training, WordID, TrainingType } from './interfaces';

type TrainingTask = { word: WordID, trainingType: TrainingType };

export class TrainingSession {

  private activeTraining: Training;
  private tasks: TrainingTask[];

  constructor(private wordIds: WordID[]) { }

  get isRunning(): boolean {
    return this.activeTraining !== undefined;
  }

  start(): void {
    this.tasks = this.wordIds.map(wordId => ({ word: wordId, trainingType: TrainingType.Learn }));
    this.activeTraining = {
      id: generateShortid(),
      records: [],
      date: new Date()
    }
  }

  getActiveTask(): TrainingTask {
    return head(this.tasks);
  }

  solveActiveTask(): void {
    const activeTask = this.getActiveTask();

    this.activeTraining.records = [...this.activeTraining.records, {
      word: activeTask.word,
      type: activeTask.trainingType,
      date: new Date()
    }];
  }

  getTraining(): Training {
    return { ...this.activeTraining };
  }

}
