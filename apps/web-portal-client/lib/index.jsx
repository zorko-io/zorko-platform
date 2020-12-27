import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {AppProvider} from './context'
import store from './store'
import {AppContainer} from './app/AppContainer'
import './index.css'

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <AppProvider>
        <AppContainer />
      </AppProvider>
    </Provider>
  </HashRouter>,
  document.getElementById('app')
)
