import {LivrValidator} from './livr'

export function createValidator(rules) {
  return new LivrValidator(rules)
}
