import React from 'react'

export function Card({previews}) {
  return (
    <div className="flex-auto mx-4 my-4 w-72">
      <div id="pr">{JSON.stringify(previews)}</div>

      <img className="w-full" src="https://graphsketch.com/images/blank.png" alt="" />

      <div>Lorem ipsum dolor sit.</div>
      <div className="flex">
        <div className="w-10">
          <img src="https://image.flaticon.com/icons/png/128/924/924874.png" alt="" />
        </div>

        <div className="m-1">
          <div className="font-extralight text-xs">Author</div>
          <div className="text-gray-600 font-extralight text-xs">Date</div>
        </div>
      </div>
    </div>
  )
}
