import React, {useState} from 'react'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light-border.css'

import {Popover} from '../../../components/Popover'
import {Button} from '../../../components/Button'

export function PopperExample() {
  return (
    <Popover>
      {(visible, setVisible) => (
        <Button label="Popover example" onClick={() => setVisible(!visible)} />
      )}
    </Popover>
  )
}
