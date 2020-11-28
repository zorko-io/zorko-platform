import React from 'react'
import {createValidator} from '@util-validation'

export default function Validator() {
  const rules = {
    name: 'required',
    email: ['required', 'email'],
    gender: {one_of: ['male', 'female']},
    phone: {max_length: 10},
    password: ['required', {min_length: 10}],
    password2: {equal_to_field: 'password'}
  }
  const value = {
    name: 'Name',
    email: 'test@gmail.com',
    gender: 'male',
    phone: '+123456789',
    password: 'password12',
    password2: 'password12'
  }

  const {error, result} = createValidator(rules).parse(value)

  return !error ?
    <div>{JSON.stringify(result)}</div> :
    <div>{error.message}</div>
}
