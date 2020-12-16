import React from 'react'

export function ExamplesPage() {
  return (
    <div id="__next">
      <div className="sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-white flex-none flex">
        <div className="flex-none pl-4 sm:pl-6 xl:pl-8 flex items-center border-b border-gray-200 lg:border-b-0 lg:w-60 xl:w-72">
          Logo
        </div>
      </div>

      <div className="w-full max-w-8xl mx-auto">
        <div className="lg:flex">
          <div
            id="sidebar"
            className="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden"
          >
            <div
              id="navWrapper"
              className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0"
            >
              <div className="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white"></div>
              <nav
                id="nav"
                className="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-16 sticky?lg:h-(screen-18)"
              >
                <ul>
                  <li>
                    <a
                      href="https://tailwindcss.com/docs"
                      className="flex items-center px-3 hover:text-gray-900 transition-colors duration-200 mb-4 text-gray-900"
                    >
                      <div className="mr-3 rounded-md bg-gradient-to-br from-pink-500 to-rose-500">
                        <svg className="h-6 w-6" viewBox="0 0 24 24">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9 6C10.0929 6 11.1175 6.29218 12 6.80269V16.8027C11.1175 16.2922 10.0929 16 9 16C7.90714 16 6.88252 16.2922 6 16.8027V6.80269C6.88252 6.29218 7.90714 6 9 6Z"
                            fill="#FFF1F2"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15 6C16.0929 6 17.1175 6.29218 18 6.80269V16.8027C17.1175 16.2922 16.0929 16 15 16C13.9071 16 12.8825 16.2922 12 16.8027V6.80269C12.8825 6.29218 13.9071 6 15 6Z"
                            fill="#FECDD3"
                          ></path>
                        </svg>
                      </div>
                      Documentation
                    </a>
                  </li>

                  <li className="mt-8">
                    <h5 className="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900">
                      Getting started
                    </h5>
                    <ul>
                      <li>
                        <a
                          className="px-3 py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500"
                          href="https://tailwindcss.com/docs/installation"
                        >
                          <span className="rounded-md absolute inset-0 bg-cyan-50 opacity-0"></span>
                          <span className="relative">Installation</span>
                        </a>
                      </li>
                      <li>
                        <a
                          className="px-3 py-2 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500"
                          href="https://blog.tailwindcss.com/tailwindcss-v2"
                        >
                          <span className="rounded-md absolute inset-0 bg-cyan-50 opacity-0"></span>
                          <span className="relative">Release Notes</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div
            id="content-wrapper"
            className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible"
          >
            <div className="px-4 sm:px-6 xl:px-8 pt-10 pb-16">Content</div>
          </div>
        </div>
      </div>
    </div>
  )
}

ExamplesPage.propTypes = {}

ExamplesPage.defaultProps = {}
