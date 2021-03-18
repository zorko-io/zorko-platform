/* eslint-disable no-unused-vars */
import {NotYetImplementedError} from '@zorko-io/util-error'
import {Access} from './Access.mjs'

/**
 * Common props for all content
 */

export class Content extends Access {

  get properties () {
    throw new NotYetImplementedError()
  }

}