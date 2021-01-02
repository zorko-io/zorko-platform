import React from 'react'
import PropTypes from 'prop-types'

import {SidebarLayout} from './SidebarLayout'

export function Sidebar({title, children}) {
  return <SidebarLayout title={title} renderSidebar={() => children} />
}

Sidebar.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

Sidebar.defaultProps = {
  title: '',
  children: null,
}
