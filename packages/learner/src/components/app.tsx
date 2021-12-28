import { Route, Routes } from "react-router-dom";

import { TrainingManager, Storage } from "../services";
import { ImportReverso } from "../services/import-reverso";

import { Training } from "./training/training";
import { Dictionary } from "./dictionary/dictionary";

import "./app.scss";
export const App = () => {
  const storage = new Storage();
  storage.load();

  const manager = new TrainingManager(storage);

  (window as any).importReverso = new ImportReverso(storage);

  return (
    <Routes>
      <Route path="/dictionary" element={<Dictionary />}></Route>
      <Route path="/" element={<Training trainingManager={manager} />}></Route>
    </Routes>
  );
};
