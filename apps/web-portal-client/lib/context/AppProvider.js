import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {client} from '../api'
import {logger} from '../logger'
import {AppContext} from './AppContext'
import {BrowserKeys, BrowserStorage} from '../utils'

export function AppProvider(props) {
  const location = useLocation()
  useEffect(() => {
    BrowserStorage.setLocalStorageValue(BrowserKeys.LastPath, location.pathname)
  }, [location.pathname])

  const {children} = props
  return <AppContext.Provider value={{api: client, logger}}>{children}</AppContext.Provider>
}

AppProvider.propTypes = {
  children: PropTypes.shape({}),
}

AppProvider.defaultProps = {
  children: null,
}
