import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light-border.css'

import {childrenPropTypes} from '../utils'

export function Popover({title, text, duration, delay, children}) {
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
      duration={duration}
      delay={delay}
      theme="light-border"
    >
      <span>{children(visible, setVisible)}</span>
    </Tippy>
  )
}

Popover.propTypes = {
  duration: PropTypes.number,
  delay: PropTypes.arrayOf(PropTypes.number),
  children: childrenPropTypes,
  title: PropTypes.string,
  text: PropTypes.string,
}

Popover.defaultProps = {
  duration: 0,
  delay: [300, 0],
  children: null,
  title: '',
  text: '',
}
