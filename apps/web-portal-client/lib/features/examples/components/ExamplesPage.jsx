import React from 'react'
import {Switch, Route} from 'react-router-dom'

import {Content, Sidebar, SidebarItem, Header, Layout} from '../../../components/layout'
import {ApiExample} from './ApiExample'
import {ValidatorExample} from './ValidatorExample'
import {ButtonsExample} from './ButtonsExample'

export function ExamplesPage() {
  return (
    <Layout
      headerRender={() => <Header />}
      sidebarRender={() => (
        <Sidebar title="Get started">
          <SidebarItem name="API" link="/example/api" />
          <SidebarItem name="Validator" link="/example/validator" />
          <SidebarItem name="Buttons" link="/example/buttons" />
        </Sidebar>
      )}
      contentRender={() => (
        <Content
          title="Our Examples"
          innerContentRender={() => (
            <Switch>
              <Route path="/example/validator" render={() => <ValidatorExample />} />
              <Route path="/example/api" render={() => <ApiExample />} />
              <Route path="/example/buttons" render={() => <ButtonsExample />} />
            </Switch>
          )}
        />
      )}
    />
  )
}
