/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Access} from '../Access'

/**
 * Common props for all content
 */

export class ContentAccess extends Access {

  get properties () {
    throw new NotYetImplementedError()
  }
}