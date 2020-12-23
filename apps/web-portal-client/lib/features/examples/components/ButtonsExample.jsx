import React from 'react'

import {Button, Image, ImageShapes} from '../../../components'

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
          <Image shape={ImageShapes.cross} />
        </Button>
      </div>
      <div>
        <h1>Mobile menu button with sandwich</h1>
        <Button>
          <Image shape={ImageShapes.sandwich} />
        </Button>
      </div>
    </div>
  )
}
