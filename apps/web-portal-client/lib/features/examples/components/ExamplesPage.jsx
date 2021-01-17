import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {Content, Sidebar, SidebarItem, Layout} from '../../../components/layout'
import {ApiExample} from './ApiExample'
import {ValidatorExample} from './ValidatorExample'
import {ButtonsExample} from './ButtonsExample'
import {DialogExample} from './DialogExample'

export function ExamplesPage() {
  return (
    <Layout
      sidebarRender={() => (
        <Sidebar title="Get started">
          <SidebarItem name="API" link="/example/api" />
          <SidebarItem name="Validator" link="/example/validator" />
          <SidebarItem name="Buttons" link="/example/buttons" />
          <SidebarItem name="Dialog" link="/example/dialog" />
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
              <Route path="/example/dialog" render={() => <DialogExample />} />
              <Route path="/example" render={() => <Redirect to="/example/dialog" />} />
            </Switch>
          )}
        />
      )}
    />
  )
}
