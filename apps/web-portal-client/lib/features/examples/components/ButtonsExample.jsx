import React from 'react'

import {Button, Image, ImageShapes} from '../../../components'

export function ButtonsExample() {
  return (
    <div className="space-y-4">
      <div>
        <h1>General default button</h1>
        <Button label="Defaul Button" />
      </div>
      <div>
        <h1>General primary button</h1>
        <Button label="Primary Button" type="primary" />
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
