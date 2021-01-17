import React, {useState} from 'react'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light-border.css'

import {Button} from '../../../components/Button'

export function TippyExample() {
  const [visible, setVisible] = useState(false)

  const content = (
    <div>
      <div className="text-black opacity-75 font-semibold p-3 mb-0 border-b border-solid border-gray-200 uppercase rounded-t-lg">
        popover title
      </div>
      <div className="text-black p-3">
        And here's some amazing content. It's very engaging. Right?
      </div>
    </div>
  )

  return (
    <Tippy
      content={content}
      visible={visible}
      arrow={true}
      animation="scale"
      duration={0}
      delay={[300, 0]}
      theme="light-border"
    >
      <span>
        <Button label="Tippy" onClick={() => setVisible(!visible)} />
      </span>
    </Tippy>
  )
}
