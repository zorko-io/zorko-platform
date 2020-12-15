import React from 'react'
import {useDispatch} from 'react-redux'
import {userLogout} from '../../features/auth/effects'

export function LoginButton() {
  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(userLogout())
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          handleLogout()
        }}
        className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        Logout
      </button>
    </div>
  )
}

LoginButton.propTypes = {}

LoginButton.defaultProps = {}
