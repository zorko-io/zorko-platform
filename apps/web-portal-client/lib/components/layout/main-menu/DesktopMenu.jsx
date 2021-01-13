import React from 'react'
import {childrenPropTypes} from '../../../utils/childrenPropTypes'

export function DesktopMenu({children}) {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">{children}</div>
    </div>
  )
}

DesktopMenu.propTypes = {
  children: childrenPropTypes,
}

DesktopMenu.defaultProps = {
  children: null,
}
