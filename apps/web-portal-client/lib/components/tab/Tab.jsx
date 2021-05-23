import React, {useState} from 'react'
import {Button} from '../Button'
import {Image} from '../Image'

import {childrenPropTypes} from '../../utils'

export function Tab({children}) {
  const [activeTabIndex, setActiveTab] = useState(0)

  return (
    <div className="w-1/2 mx-auto mt-20  rounded bg-gray-100">
      <div id="tab-contents">
        <div id="first" className="p-4">
          {children[activeTabIndex]}
        </div>
      </div>

      <div className="inline-flex w-full px-1 pt-2 ">
        {children.map((tab, index) => (
          <Button
            key={tab.props.id}
            type={index === activeTabIndex ? 'active-tab' : 'default-tab'}
            onClick={() => setActiveTab(index)}
          >
            <div className="flex">
              <div className="flex-auto px-1">
                {tab.props.icon ? <Image shape={tab.props.icon} /> : ''}
              </div>
              <div className="flex-auto">{tab.props.name}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}

Tab.propTypes = {
  children: childrenPropTypes,
}

Tab.defaultProps = {
  children: null,
}
