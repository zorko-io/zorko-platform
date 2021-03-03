import React from 'react'
import PropTypes from 'prop-types'
import {client} from '../api'
import {logger} from '../logger'
import {appPersistentStorage} from '../utils'
import {AppContext} from './AppContext'

export function AppProvider(props) {
  const {children} = props
  return (
    <AppContext.Provider value={{api: client, logger, appPersistentStorage}}>
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.shape({}),
}

AppProvider.defaultProps = {
  children: null,
}
