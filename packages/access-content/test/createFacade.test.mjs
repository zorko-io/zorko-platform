import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper/index.mjs'
import {
  createFacade,
  AccessContentFacade,
  RegisterAccess,
  RepositoryAccess
} from '../lib'

import {ContentAccess} from '../lib/core/content/ContentAccess'

setupDb(test, async (t) => {
  const {db} = t.context
  try {
    t.context.facade = await createFacade(db)
  } catch (err) {
    console.error(`Can't create access content facade`, err)
    throw err
  }
})

test.serial('create facade with proper getters', async (t) => {
  const {facade} = t.context

  t.true(facade instanceof AccessContentFacade)
  t.true(facade.register instanceof RegisterAccess)
  t.true(facade.content instanceof ContentAccess)
  t.true(facade.repository instanceof RepositoryAccess)
})