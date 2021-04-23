import test from '@zorko-io/tool-test-harness'
import {MongoRepositoryResourceModel} from './MongoRepositoryResourceModel'
import {toObjectId} from '../util'
import {PermissionDefaults} from '../../core/index.mjs'

// * @property {String} id
// * @property {String} dir
// * @property {String} name
// * @property {String} content
// * @property {String} mime
// * @property {String} preview
// * @property {String} permission

test('check repo resource mongo model', (t) => {

  t.is(MongoRepositoryResourceModel.toCollectionName({
    owner: 'joe',
    name: 'my-repo'
  }), 'repository.joe.my-repo')

  const id = toObjectId()

  const props = {
    id: id.toString(),
    name: 'Bar Chart',
    parent: '/my-repo',
    path: '/my-repo/Bar Chart',
    content: 'some-content-id',
    mime: 'some-mime-type',
    preview: 'preview/data/url/here',
    permission: PermissionDefaults.Public
  }

  const doc = {
    _id: id,
    name: 'Bar Chart',
    parent: '/my-repo',
    content: 'some-content-id',
    mime: 'some-mime-type',
    preview: 'preview/data/url/here',
    permission: PermissionDefaults.Public
  }

  const instance = new MongoRepositoryResourceModel({doc})

  t.truthy(instance)


  t.deepEqual(instance.toJSON(), props)
  let actualDoc = instance.toDocument()

  t.is(actualDoc._id.toString(), doc._id.toString())

  delete actualDoc._id
  delete doc._id

  t.deepEqual(actualDoc, doc)

})

