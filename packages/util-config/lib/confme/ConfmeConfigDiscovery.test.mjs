import test from '@zorko-io/tool-test-harness'
import {ConfmeConfigDiscovery} from './ConfmeConfigDiscovery'
import sinon from 'sinon'

test('calls confme for confs discovery', async (t) => {
  // TODO: gh-228 move to other file

  const definition =  'foo/foo'
  const validation = 'boo/boo'
  const expected = {key1: 'someresult'}
  const confme = sinon.stub().returns(expected)

  const discovery = new ConfmeConfigDiscovery({
    definition,
    validation
  }, {confme})

  const actual = discovery.discover()

  t.true(confme.calledOnce, 'should call confme')
  t.deepEqual(confme.firstCall.args, [definition, validation])
  t.deepEqual(actual, expected)
})