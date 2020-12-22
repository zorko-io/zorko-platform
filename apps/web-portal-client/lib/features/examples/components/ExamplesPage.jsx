import React from 'react'
import {Switch, Route} from 'react-router-dom'

import {Content, Header, Sidebar, Navbar, Layout} from '../../../components/layout'
import {ApiExample} from './ApiExample'
import {ValidatorExample} from './ValidatorExample'
import {Button} from '../../../components/layout/nav-bar'

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
            {name: 'Button', link: '/example/button'},
          ]}
        />
      )}
      headerRender={() => <Header title="Our Examples" />}
      contentRender={() => (
        <Content
          innerContentRender={() => (
            <Switch>
              <Route path="/example/validator" render={() => <ValidatorExample />} />
              <Route path="/example/api" render={() => <ApiExample />} />
              <Route path="/example/button" render={() => <Button label="Example" />} />
            </Switch>
          )}
        />
      )}
    />
  )
}
