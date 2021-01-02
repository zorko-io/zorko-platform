# util-use-cases

Contains a unified approach to encapsulate business logic

# Basic Usage


## Create UseCase

Provide a subclass from `UseCase`

```
import {UseCase} from '@zorko-io/util-use-case'

export class FooDoSomething extends UseCase {
  // define static rules
  static rules = {name: 'required'}

  async run(params) {
    // provide a buisness logic here
  }
}
```

## Run UseCase

To trigger `UseCase` execution you need `makeRunner` function, it prepares a closure to
with unified use case execution logic  (creation, error handling, etc.)

```
import {makeRunner} from '@zorko-io/util-use-case'

// create runner
const doSomething = makeRunner(FooDoSomething, {
  toParams    //...
  toContext   //...
})

// call runner later on
doSomething()

```
