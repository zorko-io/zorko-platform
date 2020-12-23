import React from 'react'

import {Button, Image, imageShapes} from '../../../components/layout/nav-bar'

export function ButtonsExample() {
  return (
    <div>
      <div>
        <h1>General button</h1>
        <Button label="Example" />
      </div>
      <div>
        <h1>Mobile menu button with cross</h1>
        <Button>
          <Image shape={imageShapes.cross} />
        </Button>
      </div>
      <div>
        <h1>Mobile menu button with sandwich</h1>
        <Button>
          <Image shape={imageShapes.sandwich} />
        </Button>
      </div>
    </div>
  )
}
