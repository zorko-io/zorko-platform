/**
 * Creates a use case, it's not only calls new with passed constructor,
 * but doing various enhancements
 * @params {ObjectConstructor} - class for particular use case, should be a UseCase or it's subclass
 * @returns {UseCase}  - instance of passed class with various decorators over it
 */
import {NotYetImplementedError} from '@zorko-io/util-error'

/* eslint-disable no-unused-vars */
function createUseCase() {
   throw new NotYetImplementedError()
}
