import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import {AppContainer} from './app/AppContainer'
import './index.css'

// TODO: gh-23 Add Login page as component here
ReactDOM.render(
  <HashRouter>
    <AppContainer />
  </HashRouter>,
  document.getElementById('app')
)
