import React from 'react'
import PropTypes from 'prop-types'

import {childrenPropTypes} from '../../utils'

export function TabItem({id, name, children}) {
  return (
    <div id={id} name={name}>
      <div>{children}</div>
    </div>
  )
}

TabItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  children: childrenPropTypes,
}

TabItem.defaultProps = {
  id: '',
  name: '',
  children: null,
}
