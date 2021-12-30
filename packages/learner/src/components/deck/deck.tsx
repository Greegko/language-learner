import shortid = require("shortid");
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Storage } from "../../services";
import { Deck, DeckID, Word } from "../../services/interfaces";

interface DeckProperties {
  storage: Storage;
}

import "./desk.scss";
export const DeckPage = ({ storage }: DeckProperties) => {
  const decks = storage.getAvailableDecks();
  const [selectedDeck, setSelectedDeck] = useState<Deck>(() => decks ? decks[0] : null);

  const selectDeck = useCallback((changeEvent: ChangeEvent<HTMLSelectElement>) => {
    const deck = storage.getDeck(changeEvent.target.value);
    setSelectedDeck(deck);
  }, []);

  const addNewDeck = useCallback(() => {
    const deckName = window.prompt('New deck name');
    const deck = storage.addDeck(deckName);
    setSelectedDeck(deck);
  }, []);

  return (
    <div className="deck">
      <div>
        <select onChange={selectDeck}>
          {decks.map(deck => <option value={deck.id}>{deck.name}</option>)}
        </select>
        <button onClick={addNewDeck}>Add new Deck</button>
      </div>

      <div className="columns">
        <div>
          <Import storage={storage} activeDeck={selectedDeck} />
        </div>
        {selectedDeck && <div>
          Words ({ selectedDeck.words.length })
          
          <table>
            <tbody>
              {selectedDeck.words.map(x => storage.getWord(x)).map(word => <tr><td>{word.word}</td><td>{word.translations[0].translation}</td></tr>)}
            </tbody>
          </table>
        </div>}
        {selectedDeck && <div>
          Training Records

          <table>
            <tbody>
              {selectedDeck.trainingRecords.map(record => <tr><td>{record.type}</td><td>{record.date}</td></tr>)}
            </tbody>
          </table>
        </div>}
      </div>
    </div>
  );
};

interface ImportProperties {
  storage: Storage;
  activeDeck: Deck;
}

const Import = ({ storage, activeDeck }: ImportProperties) => {
  const textareaRef = useRef<HTMLTextAreaElement>();
  const doImport = useCallback(() => {
    const content = textareaRef.current.value;
    const words = textToWords(content);
    words.forEach(word => storage.addWord(activeDeck.id, word));

    storage.save();

    textareaRef.current.value = '';
  }, [activeDeck]);

  return (
    <div className="import">
      <div>Import</div>
      <br />
      <textarea ref={textareaRef}></textarea>
      <br />
      <button onClick={doImport}>Import</button>
    </div>
  );
};

function textToWords(text: string): Word[] {
  const words = text.split("\n");

  const getTranslations = (text: string) =>
    text.split(",").map((y) => ({ translation: y }));

  const wordTexttoWord = (text: string) => {
    const fields = text.split("\t");

    return {
      id: shortid(),
      word: fields[0],
      translations: getTranslations(fields[1]),
    };
  };

  return words.map(wordTexttoWord);
}
