import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper'
import {createFacade} from './createFacade'
import {AccessContentFacade, RegisterAccess} from './core'

setupDb(test, async (t) => {
  const {db} = t.context
  try {
    t.context.facade = await createFacade(db)
  } catch (err) {
    console.error(`Can't create access content facade`, err)
    throw err
  }
})

test.serial('create facade on top of mongo db', async (t) => {
  const {facade} = t.context

  t.true(facade instanceof AccessContentFacade)
  t.true(facade.register instanceof RegisterAccess)
})