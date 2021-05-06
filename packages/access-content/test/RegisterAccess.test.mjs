import test from '@zorko-io/tool-test-harness'
import {setupDb} from './helper'
import {createFacade} from '../lib'
import {AlreadyExistsError, NotFoundError} from '@zorko-io/util-error'

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

test.serial('add new record', async (t) => {
  const {register} = t.context

  const record = await register.add({
    owner: 'joe',
    repo: 'default'
  })

  t.truthy(record)
  t.is(record.owner, 'joe')
  t.is(record.name, 'repository.joe.default')

  t.truthy(typeof record.id === 'string' && record.id)
})

test.serial('add new record, read and remove - happy path', async (t) => {
  const {register} = t.context
  const newRecord = await register.add({
    owner: 'joe',
    repo: 'other-repo'
  })

  t.truthy(newRecord)

  const record = await register.get({
    repo: newRecord.name,
    owner: newRecord.owner
  })

  t.deepEqual(record, newRecord)

  await register.remove({
    repo: newRecord.name,
    owner: newRecord.owner
  })

  await t.throwsAsync(
    async () => {
      await register.get({
        repo: record.name,
        owner: record.owner
      })
    },
    {
      instanceOf: NotFoundError,
      message: 'Can\'t find repository record by #repo=repository.joe.other-repo, #owner=joe',
    }
  )
})

test.serial('iterate on empty and should not fail on second call', async (t) => {
  const {register} = t.context
  const owner = 'joe'

  let records = register.iterate({owner})

  let result = await records[Symbol.asyncIterator]().next()

  t.true(result.done)

  result = await records[Symbol.asyncIterator]().next()

  t.true(result.done)
})

test.serial('allocate default and other repo, iterate  - with happy path', async (t) => {
  const {register} = t.context

  t.truthy(register)

  const joe = 'joe'
  const otherRepo = 'other-repo'
  const defaultRecord = await register.add({ owner: joe, repo: 'default'})
  const otherRepoRecord = await register.add({ owner: joe, repo: otherRepo})
  const records = register.iterate({owner: joe})

  let results = []

  for await (const record of records) {
    results.push(record)
  }

  t.true(results.length === 2)

  t.deepEqual(results[0], defaultRecord)
  t.deepEqual(results[1], otherRepoRecord)
})

test.serial('fails if repository with same owner and name already exists', async (t) => {
  const {register} = t.context
  const owner = 'joe'
  const name = 'my-repo'

  await register.add({ owner, repo: name})

  await t.throwsAsync(
    async () => {
      await register.add({ owner, repo: name})
    },
    {
      instanceOf: AlreadyExistsError,
      message: `Repository with #name=${name} already created for #owner=${owner}`,
    }
  )

})
