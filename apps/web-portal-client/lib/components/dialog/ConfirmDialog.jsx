import React from 'react'
import PropTypes from 'prop-types'

import {Dialog} from './Dialog'
import {Button} from './Button'

export function ConfirmDialog({children, title, open, onClose, onConfirm}) {
  if (!open) return <></>

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <Button onClick={() => onClose()} className="bg-secondary hover:bg-secondary-light">
            No
          </Button>
        </div>
        <div className="p-1">
          <Button
            onClick={() => {
              onClose()
              onConfirm()
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
}

ConfirmDialog.defaultProps = {
  '': () => {},
}
