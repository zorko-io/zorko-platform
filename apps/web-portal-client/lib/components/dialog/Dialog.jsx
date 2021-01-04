import React from 'react'
import PropTypes from 'prop-types'

import {IconButton} from './IconButton'
import {ExitIcon} from './ExitIcon'

export function Dialog({open, onClose, children}) {
  if (!open) {
    return <></>
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div>{children}</div>
        <span className="absolute top-0 right-0 p-4">
          <IconButton onClick={() => onClose()}>
            <ExitIcon />
          </IconButton>
        </span>
      </div>
    </div>
  )
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

Dialog.defaultProps = {
  '': () => {},
}