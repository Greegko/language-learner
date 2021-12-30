import { Route, Routes } from "react-router-dom";

import { TrainingManager, Storage } from "../services";

import { Training } from "./training/training";
import { Deck } from "./deck/deck";

import "./app.scss";
export const App = () => {
  const storage = new Storage();
  storage.load();

  const manager = new TrainingManager(storage);

  return (
    <Routes>
      <Route path="/deck" element={<Deck />}></Route>
      <Route path="/" element={<Training trainingManager={manager} />}></Route>
    </Routes>
  );
};
