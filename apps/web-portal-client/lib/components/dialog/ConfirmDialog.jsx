import React from 'react'
import PropTypes from 'prop-types'
import {childrenPropTypes} from '../../utils/childrenPropTypes'

import {Dialog} from './Dialog'
import {Button} from '../Button'

export function ConfirmDialog({children, title, open, onClose, onConfirm}) {
  if (!open) return null

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end space-x-4">
        <Button label="No" onClick={() => onClose()} />
        <Button
          label="Yes"
          type="primary"
          onClick={() => {
            onClose()
            onConfirm()
          }}
        />
      </div>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  children: childrenPropTypes,
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
}

ConfirmDialog.defaultProps = {
  children: null,
  title: '',
  open: true,
  onClose: () => {},
  onConfirm: () => {},
}
