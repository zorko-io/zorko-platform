import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import AppContainer from './app/AppContainer';
import './index.css';

ReactDOM.render(
  <HashRouter>
    <AppContainer />
  </HashRouter>,
  document.getElementById('app')
);
