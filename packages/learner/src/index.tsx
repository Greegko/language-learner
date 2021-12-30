import { App } from './components/app';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";


const body = document.getElementById('app');
render(
  <BrowserRouter basename='/language-learner'>
    <App />
  </BrowserRouter>
  ,
  body
);
