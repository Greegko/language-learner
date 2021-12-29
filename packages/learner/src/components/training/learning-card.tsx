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

  const translation = head(word.translations);
  const example = translation.example;

  return (
    <div className="training-card">
      <audio src={getAudioUrl(word.word)} ref={refAudioWord} />
      <audio src={getAudioUrl(example.example)} ref={refAudioExample} />

      <div className='header'>
        <Level />
      </div>

      <div className='content'>
        <div className='task'>
          <input className='text-input' />
        </div>
      </div>

      <div className='footer'>
          {word.translations[0].translation}
      </div>
    </div>
  );
}

function Level() {
  return (
    <div className='level'>
      <span className='rating rating-1'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>

      <span className='rating-text'>
        New word
      </span>
    </div>
  );
}
