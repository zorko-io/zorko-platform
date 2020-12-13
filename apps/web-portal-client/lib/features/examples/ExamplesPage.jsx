import React from 'react'
import {Layout} from './components/layout/Layout'
import {HeaderLayout} from './components/layout/HeaderLayout'
import {SidebarLayout} from './components/layout/SidebarLayout'
import {ContentLayout} from './components/layout/ContentLayout'

export function ExamplesPage() {
  return (
    <Layout
      renderHeader={() => <HeaderLayout />}
      renderSideBar={() => <SidebarLayout />}
      renderContent={() => <ContentLayout />}
    />
  )
}

ExamplesPage.propTypes = {}

ExamplesPage.defaultProps = {}
