# Utils Lang

Generic utils which are nice to have as a part of language API

Example:

```

import {isTypeInProtoChain} from '@zorko-io/util-lang'


class Base {}

class LevelOneBase extend Base {}

class SubBase extends LevelOneBase {}


if (isTypeInProtoChain(SubBase, Base)){
  console.log('SubBase inherits Base')
}


```
