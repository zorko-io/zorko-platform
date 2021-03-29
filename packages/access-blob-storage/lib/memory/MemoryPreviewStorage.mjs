/* eslint-disable no-unused-vars */
import {PreviewStorage} from '../core'

export class MemoryPreviewStorage extends PreviewStorage {
  #previewBucket = null
  #bucket = 'preview'

  constructor(mock = new Map()) {
    super()
    this.#previewBucket = mock
  }

  async save(params) {
    return this.#previewBucket.set(params.name, params.data)
  }

  async read(params) {
    return this.#previewBucket.get(params.name)
  }

  async remove(params) {
    return this.#previewBucket.delete(params.name)
  }
}
