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
      <div className="flex justify-end">
        <div className="p-1 w-1/5 flex">
          <Button
            label="No"
            cssClass="bg-smooth-green hover:bg-smooth-green-light flex-auto"
            onClick={() => onClose()}
          />
        </div>
        <div className="p-1 w-1/5 flex">
          <Button
            label="Yes"
            cssClass="bg-smooth-green hover:bg-smooth-green-light flex-auto"
            onClick={() => {
              onClose()
              onConfirm()
            }}
          />
        </div>
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
