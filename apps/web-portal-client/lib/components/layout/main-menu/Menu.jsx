import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {MobileLayout} from './MenuLayouts'

export function Menu({layout: Layout, isShown, children}) {
  return (
    <Layout
      renderItems={() =>
        React.Children.map(children, (child) =>
          React.cloneElement(child, {
            isMobile: Layout === MobileLayout,
          })
        )
      }
      isShown={isShown}
    />
  )
}
