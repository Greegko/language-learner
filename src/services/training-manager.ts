import { head, groupBy, map, pipe, sortBy, prop, last, reverse, toPairs, takeLastWhile } from "ramda";

import { TrainingType, Word, TrainingRecord, ReviewResult, TrainingReviewRecord } from "./interfaces";
import { Storage } from "./storage";

export type TrainingTask = { word: Word, trainingType: TrainingType };

export class TrainingManager {

  constructor(private storage: Storage) { }

  solveActiveTask(result?: any): void {
    const task = this.activeTask;
    if (task.trainingType === TrainingType.Discovery) {
      this.storage.addTrainingRecord({
        word: task.word.id,
        date: new Date(),
        type: TrainingType.Discovery
      });
    }

    if (task.trainingType === TrainingType.Review) {
      this.storage.addTrainingRecord({
        word: task.word.id,
        date: new Date(),
        type: TrainingType.Review,
        result
      })
    }
  }

  get activeTask(): TrainingTask {
    const records = this.storage.getTrainingRecords().map((x, index) => ({ ...x, tick: index }));

    const currentTick = records.length;

    const queueList = pipe(
      groupBy<TrainingRecord>(x => x.word),
      map(this.tickSchedule) as any,
      toPairs,
      sortBy(prop(1 as any)) as any
    )(records) as [string, number][];

    const nextInQueue = head(queueList);

    if (nextInQueue && nextInQueue[1] < currentTick) {
      return {
        word: this.storage.getWord(nextInQueue[0]),
        trainingType: TrainingType.Review
      };
    }

    return {
      word: this.nextNewWord,
      trainingType: TrainingType.Discovery
    }

  }

  private tickSchedule(records: (TrainingRecord & { tick: number })[]) {
    const lastRecord = last(records);

    if (lastRecord.type === TrainingType.Discovery) {
      return lastRecord.tick + 3;
    }

    if (lastRecord.type === TrainingType.Review) {
      if (lastRecord.result === ReviewResult.Easy) {
        const score = takeLastWhile((x: TrainingReviewRecord) => x.result === ReviewResult.Easy, records as any);
        return lastRecord.tick + (score.length * 50);
      }

      if (lastRecord.result === ReviewResult.Medium) {
        return lastRecord.tick + 10;
      }

      if (lastRecord.result === ReviewResult.Hard) {
        return lastRecord.tick + 3;
      }
    };
  }

  private get nextNewWord(): Word {
    const trainingRecords = this.storage.getTrainingRecords();
    const groupedById = groupBy<TrainingRecord>(x => x.word, trainingRecords);

    for (let word of reverse(this.storage.getWords())) {
      if (!(word.id in groupedById)) {
        return word;
      }
    }
  }

}
