# Tool Test Harness

CLI testing utility to unify unit/integration testing across all packages

## Intro

To run unit/integration test we use [Ava](https://github.com/avajs/ava)

Useful ava resources:

* [Assert API](https://github.com/avajs/ava/blob/master/docs/03-assertions.md)
* [Docs](https://github.com/avajs/ava/tree/master/docs)


## File Naming

Each file with test should follow `{originalFileName}.test.mjs`, for example
 for functionality in `foo.js` test should have a name `foo.test.js`

## Create unit tests

Simple test looks like

```
import test from '@zorko-io/tool-test-harness'

test('runs validate', (t) => {

   let word = 'boom'

  t.deepEqual(word, 'boom')
})


```

## Run unit tests

To run tests we use tool called `tth`, it's a tiny wrapper around `ava`

Each package  with test has next targets:

* `yarn test`
* `yarn test:watch`
* `yarn test:coverage`

Which triggers `tth`






