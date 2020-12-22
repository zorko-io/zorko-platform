import React from 'react'
import PropTypes from 'prop-types'
import {createClient} from '@util-web-api-client'
import {ApiContext} from './ApiContext'

export function ApiProvider(props) {
  const client = createClient()
  const {children} = props
  return <ApiContext.Provider value={{api: client}}>{children}</ApiContext.Provider>
}

ApiProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
}

ApiProvider.defaultProps = {
  children: null,
}
