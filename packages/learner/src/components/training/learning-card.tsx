import { useCallback, KeyboardEvent, createRef, useEffect, useRef, RefObject } from 'react';

import { Word } from '../../services/interfaces';

const AUDIO_BASE_URL = "https://voice.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Bruno22k?inputText=";
const getAudioUrl = (str: string) => AUDIO_BASE_URL + btoa(str.replace('é', 'Ã©'));

interface TrainingLearnCardParams {
  solveAction(solution: string): void;
  nextWordAction(): void;
  word: Word;
  showResult: boolean;
  hint: string;
}

import './learning-card.scss';
export const LearningCard = ({ word, showResult, hint, solveAction, nextWordAction }: TrainingLearnCardParams) => {
  const inputRef = useRef<HTMLInputElement>();
  const refAudioWord = useRef<HTMLAudioElement>();

  const playSound = (ref: RefObject<HTMLAudioElement>) => {
    ref.current.currentTime = 0;
    ref.current.play();
  }

  const handleEnter = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if(event.code === 'Enter' || event.code === "NumpadEnter") {
      const value = inputRef.current.value;
      inputRef.current.value = '';
      if(showResult) {
        nextWordAction();
      } else {
        solveAction(value);
      }
    }
  }, [word, showResult, hint]);

  useEffect(() => {
    if(showResult) {
      playSound(refAudioWord);
    }
  }, [showResult]);

  useEffect(() => {
    inputRef.current.focus();
  }, [hint, word]);

  return (
    <div className="training-card" onKeyPress={handleEnter}>
      <audio src={getAudioUrl(word.word)} ref={refAudioWord} />

      <div className='header'>
        <Level />
      </div>

      <div className='content'>
        <div className='task'>
          {showResult && <span className='word'>{word.word}</span>}
          {!showResult && <input ref={inputRef} className='text-input' placeholder={hint} />}
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
