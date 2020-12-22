import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {ApiProvider} from './context'
import store from './store'
import {AppContainer} from './app/AppContainer'
import './index.css'

// TODO: gh-23 Add Login page as component here
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <ApiProvider>
        <AppContainer />
      </ApiProvider>
    </Provider>
  </HashRouter>,
  document.getElementById('app')
)
