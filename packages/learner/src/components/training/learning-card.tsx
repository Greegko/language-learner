import { head } from 'ramda';
import { RefObject, useEffect, useRef } from 'react';

import { Word, TrainingType, ReviewResult } from '../../services/interfaces';

import { Icon } from '../common/icon';

const AUDIO_BASE_URL = "https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Bruno22k?inputText=";

const getAudioUrl = (str: string) => AUDIO_BASE_URL + btoa(str.replace('é', 'Ã©'));

interface TrainingLearnCardParams {
  solve(res?: any): void;
  word: Word;
  taskType: TrainingType;
}

import './learning-card.scss';
export const LearningCard = ({ word, solve, taskType }: TrainingLearnCardParams) => {
  const refAudioWord = useRef<HTMLAudioElement>();
  const refAudioExample = useRef<HTMLAudioElement>();

  const playSound = (ref: RefObject<HTMLAudioElement>) => {
    ref.current.currentTime = 0;
    ref.current.play();
  }

  useEffect(() => {
    refAudioWord.current.play();
  }, [word]);

  const translation = head(word.translations);
  const example = translation.example;

  return (
    <div>
      <audio src={getAudioUrl(word.word)} ref={refAudioWord} />
      <audio src={getAudioUrl(example.example)} ref={refAudioExample} />

      <h1>{word.word}
        <span className="play-audio-action" onClick={() => playSound(refAudioWord)}>
          <Icon icon="speaker" />
        </span>
      </h1>


      <h2>{example.example}
        <span className="play-audio-action" onClick={() => playSound(refAudioExample)}>
          <Icon icon="speaker" />
        </span>
      </h2>

      <h2>{example.exampleTranslation}</h2>


      {taskType === TrainingType.Discovery &&
        <div className='action-buttons'>
          <div className="action-button" onClick={solve}>I understand</div>
        </div>
      }

      {taskType === TrainingType.Review &&
        <div className='action-buttons'>
          <div className="action-button" onClick={() => solve(ReviewResult.Easy)}>Easy</div>
          <div className="action-button" onClick={() => solve(ReviewResult.Medium)}>Medium</div>
          <div className="action-button" onClick={() => solve(ReviewResult.Hard)}>Hard</div>
        </div>
      }

    </div>
  );
}