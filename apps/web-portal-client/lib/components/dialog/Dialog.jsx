import React from 'react'
import PropTypes from 'prop-types'
import {childrenPropTypes} from '../../utils'

import {Button} from '../Button'
import {Image, ImageShapes} from '../Image'

export function Dialog({open, onClose, children}) {
  if (!open) {
    return null
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div>{children}</div>
        <span className="absolute top-0 right-0 p-4">
          <Button onClick={() => onClose()}>
            <Image shape={ImageShapes.cross} />
          </Button>
        </span>
      </div>
    </div>
  )
}

Dialog.propTypes = {
  children: childrenPropTypes,
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

Dialog.defaultProps = {
  children: null,
  open: true,
  onClose: () => {},
}
