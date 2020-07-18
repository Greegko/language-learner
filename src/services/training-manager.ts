import { Training } from "./interfaces";
import { TrainingSession } from "./training-session";
import { WordsManager } from "./words-manager";

export class TrainingManager {

  constructor(private wordsManager: WordsManager) { }

  startNewTraining(): TrainingSession {
    const words = this.wordsManager.getWords().slice(0, 10);
    const wordIds = words.map(x => x.id);

    const session = new TrainingSession(wordIds);

    session.start();

    return session;
  }

}
