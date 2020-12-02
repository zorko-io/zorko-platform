import React from 'react'

const Card = () => {
  return (
    <div className="flex-auto mx-4 my-4 w-80">
      <img className="w-full" src="https://graphsketch.com/images/blank.png" />

      <div>Lorem ipsum dolor sit.</div>
      <div className="flex">
        <div className="w-10">
          <img src="https://image.flaticon.com/icons/png/128/924/924874.png" />
        </div>

        <div className="m-1">
          <div className="font-extralight text-xs">Author</div>
          <div className="text-gray-600 font-extralight text-xs">Date</div>
        </div>
      </div>
    </div>
  )
}

export default Card
