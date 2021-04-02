import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper'
import {createFacade} from '../lib'

setupDb(test, async (t) => {
  const {db} = t.context
  try {
    t.context.facade = await createFacade(db)
    t.context.register = t.context.facade.register
  } catch (err) {
    console.error(`Can't create access content facade`, err)
    throw err
  }
})

test.serial('create facade on top of mongo db', async (t) => {
  const {register} = t.context

  const record = await register.add('joe')

  t.truthy(record)

  t.is(record.owner, 'joe')
  t.is(record.name, 'repository.joe.default')

  t.true(typeof record.id === 'string' && record.id)

  console.log({RECORD: record.toJSON()})
})