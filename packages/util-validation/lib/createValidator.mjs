import {LivrValidator} from './livr'

var test = 0;

export function createValidator(rules) {
  return new LivrValidator(rules)
}
