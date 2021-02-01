import React from 'react'

import {Popover} from '../../../components/Popover'
import {Button} from '../../../components/Button'

export function PopoverExample() {
  return (
    <Popover
      title="Example Popover title"
      text="This text was spacially made for example popover page!"
    >
      {(visible, setVisible) => (
        <Button label="Popover example" onClick={() => setVisible(!visible)} />
      )}
    </Popover>
  )
}
