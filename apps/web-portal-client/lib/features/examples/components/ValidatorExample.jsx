import React from 'react'
import {createValidator} from '@util-validation'

export function ValidatorExample() {
  const rules = {
    name: 'required',
    email: ['required', 'email'],
    gender: {one_of: ['male', 'female']},
    phone: {max_length: 10},
    password: ['required', {min_length: 10}],
    password2: {equal_to_field: 'password'},
  }
  const value = {
    name: 'Name',
    email: 'test@gmail.com',
    gender: 'male',
    phone: '+123456789',
    password: 'password12',
    password2: 'password12',
  }

  const validator = createValidator(rules)
  const {error, result} = validator.parseSync(value)

  return !error ? <div>{JSON.stringify(result)}</div> : <div>{error.message}</div>
}
