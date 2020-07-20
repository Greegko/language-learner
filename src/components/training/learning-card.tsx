import * as React from 'react';
import { head } from 'ramda';

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
  const refAudioWord = React.useRef<HTMLAudioElement>();
  const refAudioExample = React.useRef<HTMLAudioElement>();

  React.useEffect(() => {
    refAudioWord.current.play();
  }, [word]);

  const translation = head(word.translations);
  const example = translation.example;

  return (
    <div>
      <audio src={getAudioUrl(word.word)} ref={refAudioWord} />
      <audio src={getAudioUrl(example.example)} ref={refAudioExample} />

      <h1>{word.word} - {translation.translation}</h1>
      <span onClick={() => refAudioWord.current.play()}>
        <Icon icon="speaker" />
      </span>

      <h2>{example.example}</h2>
      <h2>{example.exampleTranslation}</h2>
      <span onClick={() => refAudioExample.current.play()}>
        <Icon icon="speaker" />
      </span>

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