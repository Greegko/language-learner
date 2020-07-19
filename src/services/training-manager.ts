import { head } from "ramda";

import { TrainingType, Word, TrainingRecord } from "./interfaces";
import { Storage } from "./storage";

type TrainingTask = { word: Word, trainingType: TrainingType };

export class TrainingManager {

  constructor(private storage: Storage) { }

  getTask(): TrainingTask {
    return {
      word: head(this.storage.getWords()),
      trainingType: TrainingType.Discovery
    }
  }

  solveTask() {
    const task = this.getTask();
    const trainingRecord: TrainingRecord = {
      word: task.word.id,
      date: new Date(),
      type: TrainingType.Discovery
    }

    this.storage.addTrainingRecord(trainingRecord);
  }

}
