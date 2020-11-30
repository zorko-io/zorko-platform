import React, {useState} from 'react'
import {Layout} from '../components/layout/Layout'
import {HeaderLayout} from '../components/layout/HeaderLayout'
import {SidebarLayout} from '../components/layout/SidebarLayout'
import {ContentLayout} from '../components/layout/ContentLayout'
import DesktopMenu from '../components/layout/DesktopMenu.jsx'
import MobileButtonMenu from '../components/layout/MobileButtonMenu.jsx'
import Logo from '../components/layout/Logo.jsx'
import MobileMenu from '../components/layout/MobileMenu.jsx'

export function App() {
  const [menuStatus, setMenuStatus] = useState(false)

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo />
              <DesktopMenu
                content={{
                  items: [
                    {desc: 'Home', link: '#'},
                    {desc: 'Product', link: '#'},
                    {desc: 'Teams', link: '#'},
                    {desc: 'About', link: '#'},
                  ],
                  active: 0,
                }}
              />
            </div>

            <MobileButtonMenu menuStatus={menuStatus} setMenuStatus={setMenuStatus} />
          </div>
        </div>
        <MobileMenu
          content={{
            items: [
              {desc: 'Home', link: '#'},
              {desc: 'Product', link: '#'},
              {desc: 'Teams', link: '#'},
              {desc: 'About', link: '#'},
            ],
            active: 0,
          }}
          menuStatus={menuStatus}
        />
      </nav>

      <div className="block md:flex">
        <aside className="md:w-1/4 my-1 md:mx-5">
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

        <div className="block divide-y w-full px-2">
          <header className="">
            <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl leading-tight text-gray-900">Visualizations</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto py-6 sm:px-6 lg:px-8">
              <div className="flex flex-wrap">
                <div className="flex-auto mx-2 my-4 ">
                  <img src="https://graphsketch.com/images/blank.png" className="w-80" />
                  <div>Lorem ipsum dolor sit.</div>
                  <div className="flex">
                    <div className="w-10 flex-shrink-0">
                      <img src="https://image.flaticon.com/icons/png/128/924/924874.png" />
                    </div>

                    <div className="m-1">
                      <div className="font-extralight text-xs">Author</div>
                      <div className="text-gray-600 font-extralight text-xs">Date</div>
                    </div>
                  </div>
                </div>

                <div className="flex-auto mx-2 my-4">
                  <img src="https://graphsketch.com/images/blank.png" className="w-80" />
                  <div>Lorem ipsum dolor sit.</div>
                  <div className="flex">
                    <div className="w-10 flex-shrink-0">
                      <img src="https://image.flaticon.com/icons/png/128/924/924874.png" />
                    </div>

                    <div className="m-1">
                      <div className="font-extralight text-xs">Author</div>
                      <div className="text-gray-600 font-extralight text-xs">Date</div>
                    </div>
                  </div>
                </div>

                <div className="flex-auto mx-2 my-4 ">
                  <img src="https://graphsketch.com/images/blank.png" className="w-80" />
                  <div>Lorem ipsum dolor sit.</div>
                  <div className="flex">
                    <div className="w-10 flex-shrink-0">
                      <img src="https://image.flaticon.com/icons/png/128/924/924874.png" />
                    </div>

                    <div className="m-1">
                      <div className="font-extralight text-xs">Author</div>
                      <div className="text-gray-600 font-extralight text-xs">Date</div>
                    </div>
                  </div>
                </div>

                <div className="flex-auto mx-2 my-4 ">
                  <img src="https://graphsketch.com/images/blank.png" className="w-80" />
                  <div>Lorem ipsum dolor sit.</div>
                  <div className="flex">
                    <div className="w-10 flex-shrink-0">
                      <img src="https://image.flaticon.com/icons/png/128/924/924874.png" />
                    </div>

                    <div className="m-1">
                      <div className="font-extralight text-xs">Author</div>
                      <div className="text-gray-600 font-extralight text-xs">Date</div>
                    </div>
                  </div>
                </div>

                <div className="flex-auto mx-2 my-4 ">
                  <img src="https://graphsketch.com/images/blank.png" className="w-80" />
                  <div>Lorem ipsum dolor sit.</div>
                  <div className="flex">
                    <div className="w-10 flex-shrink-0">
                      <img src="https://image.flaticon.com/icons/png/128/924/924874.png" />
                    </div>

                    <div className="m-1">
                      <div className="font-extralight text-xs">Author</div>
                      <div className="text-gray-600 font-extralight text-xs">Date</div>
                    </div>
                  </div>
                </div>

                <div className="flex-auto mx-2 my-4 ">
                  <img src="https://graphsketch.com/images/blank.png" className="w-80" />
                  <div>Lorem ipsum dolor sit.</div>
                  <div className="flex">
                    <div className="w-10 flex-shrink-0">
                      <img src="https://image.flaticon.com/icons/png/128/924/924874.png" />
                    </div>

                    <div className="m-1">
                      <div className="font-extralight text-xs">Author</div>
                      <div className="text-gray-600 font-extralight text-xs">Date</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/*  <Layout
      renderHeader={() => <HeaderLayout />}
      renderSideBar={() => <SidebarLayout />}
      renderContent={() => <ContentLayout />}
              /> */}
    </div>
  )
}

App.propTypes = {}

App.defaultProps = {}
