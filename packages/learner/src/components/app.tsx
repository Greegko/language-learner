import { Route, Routes } from "react-router-dom";

import { TrainingManager, Storage } from "../services";

import { TrainingPage } from "./training/training";
import { DeckPage } from "./deck/deck";

import "./app.scss";
export const App = () => {
  const storage = new Storage();
  storage.load();

  const manager = new TrainingManager(storage);

  const deck = storage.getAvailableDecks()[0];

  if(deck) {
    manager.setActiveDeck(deck.id);
  }

  return (
    <Routes>
      <Route path="/deck" element={<DeckPage storage={storage} />}></Route>
      <Route path="/" element={<TrainingPage trainingManager={manager} />}></Route>
    </Routes>
  );
};
