import React from 'react'

const LoginButton = (props) => {
  const {loginStatus, setLoginStatus} = props

  return (
    <div>
      <button
        onClick={() => setLoginStatus(!loginStatus)}
        className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        {loginStatus ? 'Logout' : 'Login'}
      </button>
    </div>
  )
}

export default LoginButton
