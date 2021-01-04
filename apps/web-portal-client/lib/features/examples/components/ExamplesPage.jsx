import React from 'react'
import {Switch, Route} from 'react-router-dom'

import {Content, Header, Sidebar, Navbar, Layout} from '../../../components/layout'
import {ApiExample} from './ApiExample'
import {ValidatorExample} from './ValidatorExample'
import {ButtonsExample} from './ButtonsExample'
import {DialogExample} from './DialogExample'

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
            {name: 'Buttons', link: '/example/buttons'},
            {name: 'Dialog', link: '/example/dialog'},
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
              <Route path="/example/buttons" render={() => <ButtonsExample />} />
              <Route path="/example/dialog" render={() => <DialogExample />} />
            </Switch>
          )}
        />
      )}
    />
  )
}
