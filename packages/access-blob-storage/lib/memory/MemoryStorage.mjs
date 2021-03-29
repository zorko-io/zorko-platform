import {Storage} from '../core'
import {MemoryPreviewStorage} from './MemoryPreviewStorage'

export class MemoryStorage extends Storage {
  #preview = null

  constructor() {
    super()
    this.#preview = new MemoryPreviewStorage()
  }

  get preview() {
    return this.#preview
  }
}
