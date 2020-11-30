# util-validation

Provide a generic input validation across all layers of application,
including as browser as node environments

## Basic Usage

By default, we use [LIVR](http://webbylab.github.io/livr-playground/) declaration rules

```
import {createValidator} from './createValidator'

const validator = createValidator({
    email: ['required', 'email'],
    password: ['required', {min_length: 10}],
})
const value = {
    email: 'joe@example.com',
    password:'qwerty'
}

const {error, result} = await validator.parse(value)

if (error){
   // validation fails, handle error case here
}else {
   // validation passes, handle result here
}

```
