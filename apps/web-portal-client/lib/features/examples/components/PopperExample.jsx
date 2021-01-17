import React, {useState} from 'react'
import {usePopper} from 'react-popper'
import className from 'classnames'

import {Button} from '../../../components/Button'

export function PopperExample() {
  const [open, toggleOpen] = useState(false)

  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null)

  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    modifiers: [
      {name: 'arrow', options: {element: arrowElement, padding: 5}},
      {name: 'offset', options: {offset: [0, 10]}},
    ],
    placement: 'bottom-start',
  })

  return (
    <>
      <Button
        label="Popper"
        type="button"
        ref={setReferenceElement}
        onClick={() => {
          toggleOpen(!open)
        }}
      />

      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className={className(
          'bg-gray-400 border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg',
          {invisible: !open}
        )}
      >
        <div>
          <div className="bg-600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-gray-200 uppercase rounded-t-lg">
            popover title
          </div>
          <div className="text-white p-3">
            And here's some amazing content. It's very engaging. Right?
          </div>
        </div>

        <div ref={setArrowElement} style={styles.arrow} className="" />
      </div>
    </>
  )
}
