import * as React from 'react';
import { head } from 'ramda';

import { Word } from '../../services/interfaces';

import { Icon } from '../common/icon';

const AUDIO_BASE_URL = "https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Bruno22k?inputText=";

const getAudioUrl = (str: string) => AUDIO_BASE_URL + btoa(str);

interface TrainingLearnCardParams {
  solve(): void;
  word: Word;
}

import './learning-card.scss';
export const LearningCard = ({ word, solve }: TrainingLearnCardParams) => {
  const refAudioWord = React.useRef<HTMLAudioElement>();
  const refAudioExample = React.useRef<HTMLAudioElement>();

  const translation = head(word.translations);
  const example = translation.example;

  console.log(translation, example);

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

      <div className="action-learn" onClick={solve}>I understand</div>
    </div>
  );
}