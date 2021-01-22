import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light-border.css'

import {childrenPropTypes} from '../utils/childrenPropTypes'

export function Popover({title, text, children}) {
  const [visible, setVisible] = useState(false)

  const content = (
    <div>
      <div className="text-black opacity-75 font-semibold p-3 mb-0 border-b border-solid border-gray-200 uppercase rounded-t-lg">
        {title}
      </div>
      <div className="text-black p-3">{text}</div>
    </div>
  )

  return (
    <Tippy
      content={content}
      visible={visible}
      arrow
      animation="scale"
      duration={0}
      delay={[300, 0]}
      theme="light-border"
    >
      <span>{children(visible, setVisible)}</span>
    </Tippy>
  )
}

Popover.propTypes = {
  children: childrenPropTypes,
  title: PropTypes.string,
  text: PropTypes.string,
}

Popover.defaultProps = {
  children: null,
  title: '',
  text: '',
}
