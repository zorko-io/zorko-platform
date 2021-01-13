import React from 'react'
import PropTypes from 'prop-types'

import {Dialog} from './Dialog'
import {Button} from '../Button'

export function ConfirmDialog({children, title, open, onClose, onConfirm}) {
  if (!open) return <></>

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1 w-1/5 flex">
          <Button
            label="No"
            addClasses="bg-smooth-green hover:bg-smooth-green-light flex-auto"
            onCLick={() => onClose()}
          />
        </div>
        <div className="p-1 w-1/5 flex">
          <Button
            label="Yes"
            addClasses="bg-smooth-green hover:bg-smooth-green-light flex-auto"
            onCLick={() => {
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
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
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
