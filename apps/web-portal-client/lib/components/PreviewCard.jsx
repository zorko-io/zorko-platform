import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

export function PreviewCard({id, title, author, createdAt, previewUrl}) {
  const previewId = previewUrl.match(/(?<=\/api\/v1\/specs\/).*/)

  return (
    <div data-test-id={id} className="flex-auto mx-4 my-4 w-72">
      <Link to={`/viewer/${previewId}`}>
        <img className="w-full" src="https://graphsketch.com/images/blank.png" alt="" />
      </Link>

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
  id: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  previewUrl: PropTypes.string,
  author: PropTypes.objectOf(PropTypes.string),
}

PreviewCard.defaultProps = {
  id: '',
  title: '',
  createdAt: '',
  previewUrl: '',
  author: {
    login: '',
    avatarUrl: '',
  },
}
