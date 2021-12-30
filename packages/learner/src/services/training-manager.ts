import { head, groupBy, map, pipe, sortBy, prop, last, reverse, toPairs, takeLastWhile } from "ramda";

import { Word, TrainingRecord, TrainingRecordType } from "./interfaces";
import { Storage } from "./storage";

export type TrainingTask = { word: Word, level: number };

export class TrainingManager {

  constructor(private storage: Storage) { }

  solveTask(trainingTask: TrainingTask, solution: string): boolean {
    if(trainingTask.word.word === solution) {
      this.storage.addTrainingRecord({
        wordId: trainingTask.word.id,
        date: new Date(),
        type: TrainingRecordType.Success
      });

      return true;
    } else {
      this.storage.addTrainingRecord({
        wordId: trainingTask.word.id,
        date: new Date(),
        type: TrainingRecordType.Attempt,
        attempt: solution
      });

      return false;
    }
  }

  get activeTask(): TrainingTask {
    const records = this.storage.getTrainingRecords().map((x, index) => ({ ...x, tick: index }));

    const currentTick = records.length;

    const queueList = pipe(
      groupBy<TrainingRecord>(x => x.wordId),
      map(this.calculateLevel) as any,
      map(this.calculateTick(currentTick)) as any,
      toPairs,
      sortBy(prop(1 as any)) as any
    )(records) as [WordID: string, tick: number][];

    const nextInQueue = head(queueList);

    if (nextInQueue && nextInQueue[1] < currentTick) {
      return {
        word: this.storage.getWord(nextInQueue[0]),
        level: 1
      };
    }

    return {
      word: this.nextNewWord,
      level: 1
    }

  }

  private calculateTick(currentTick: number) {
    return (level: number) => {
      if(level === 5) return Infinity;

      return currentTick + level * 10;
    } 
  }

  private calculateLevel(records: TrainingRecord[]) {
    if(records.length === 1 && records[0].type === TrainingRecordType.Success) return 5;
    return takeLastWhile((x: TrainingRecord) => x.type === TrainingRecordType.Success, records).length;
  }

  private get nextNewWord(): Word {
    const trainingRecords = this.storage.getTrainingRecords();
    const groupedById = groupBy<TrainingRecord>(x => x.wordId, trainingRecords);

    for (let word of reverse(this.storage.getWords())) {
      if (!(word.id in groupedById)) {
        return word;
      }
    }
  }

}
