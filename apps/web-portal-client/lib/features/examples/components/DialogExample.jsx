import React, {useState} from 'react'

import {ConfirmDialog} from '../../../components/dialog'
import {Button} from '../../../components'

export function DialogExample() {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const deleteSomething = () => {}

  return (
    <div>
      <Button aria-label="delete" handleClick={() => setConfirmOpen(true)}>
        Open Confirm Dialog
      </Button>
      <ConfirmDialog
        title="Delete Something?"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={deleteSomething}
      >
        Are you sure you want to delete this?
      </ConfirmDialog>
    </div>
  )
}