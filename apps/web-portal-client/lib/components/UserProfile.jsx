import React from 'react'

const UserProfile = () => {
  return (
    <aside className="md:w-1/4  md:ml-4 mt-4 ">
      <div className="flex md:block">
        <div className="flex-shrink-0">
          <img
            src="https://image.flaticon.com/icons/png/128/924/924874.png"
            className="rounded-full w-12 m-2"
          />
        </div>

        <div className="">
          <div className="font-medium ">User Name</div>
          <div className="font-light">
            Making things at The Washington Post. Formerly at The Wall Street Journal and The
            Atlantic.
          </div>
        </div>
      </div>
    </aside>
  )
}

export default UserProfile
