import {LivrValidator} from "./LivrValidator";

export function createValidator(rules) {
  return new LivrValidator(rules)
}
