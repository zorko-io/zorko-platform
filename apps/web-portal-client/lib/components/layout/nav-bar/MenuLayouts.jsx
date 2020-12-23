import React from 'react'

export function DesktopLayout(props) {
  const {renderItems} = props

  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">{renderItems()}</div>
    </div>
  )
}

export function MobileLayout(props) {
  const {renderItems, isShown} = props

  return (
    <div
      className={className('md:hidden', {
        block: isShown,
        hidden: !isShown,
      })}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">{renderItems()}</div>
    </div>
  )
}
