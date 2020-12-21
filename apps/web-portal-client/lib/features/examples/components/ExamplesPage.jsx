import React from 'react'
import {Switch, Route} from 'react-router-dom'

import {Content, Header, Sidebar, Navbar, Layout} from '../../../components/layout'
import {ApiExample} from './ApiExample'
import {ValidatorExample} from './ValidatorExample'

export function ExamplesPage() {
  return (
    <Layout
      navbarRender={() => <Navbar />}
      sidebarRender={() => (
        <Sidebar
          description="Get started"
          items={[
            {name: 'API', link: '/example/api', active: true},
            {name: 'Validator', link: '/example/validator'},
          ]}
        />
      )}
      headerRender={() => <Header title="Our Examples" />}
      contentRender={() => (
        <Content
          innerContentRender={() => (
            <Switch>
              <Route path="/example/api" exact render={() => <ApiExample />} />
              <Route path="/example/validator" exact render={() => <ValidatorExample />} />
            </Switch>
          )}
        />
      )}
    />
  )
}
