import React from 'react'
import {Content, Header, Sidebar, Navbar, Layout} from '../../components/layout'
export function ExamplesPage() {
  return (
    <Layout
      navbarRender={() => <Navbar />}
      sidebarRender={() => (
        <Sidebar
          description="Get started"
          items={[
            {name: 'Buttons', link: '#', active: true},
            {name: 'Forms', link: '#'},
          ]}
        />
      )}
      headerRender={() => <Header title="Our Examples" />}
      contentRender={() => <Content innerContentRender={() => <div>Examples</div>} />}
    />
  )
}

ExamplesPage.propTypes = {}

ExamplesPage.defaultProps = {}
