import React from 'react'
import PropTypes from 'prop-types'

export function PreviewCard({title, author, createdAt}) {
  return (
    <div className="flex-auto mx-4 my-4 w-72">
      <img className="w-full" src="https://graphsketch.com/images/blank.png" alt="" />

      <div>{title}</div>
      <div className="flex">
        <div className="w-10">
          <img src="https://image.flaticon.com/icons/png/128/924/924874.png" alt="" />
        </div>

        <div className="m-1">
          <div className="font-extralight text-xs">{author.login}</div>
          <div className="text-gray-600 font-extralight text-xs">{createdAt}</div>
        </div>
      </div>
    </div>
  )
}

PreviewCard.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  author: PropTypes.objectOf(PropTypes.string),
}

PreviewCard.defaultProps = {
  title: '',
  createdAt: '',
  author: {
    login: '',
    avatarUrl: '',
  },
}
