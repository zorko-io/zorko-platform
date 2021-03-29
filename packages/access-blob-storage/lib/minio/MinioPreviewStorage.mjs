/* eslint-disable no-unused-vars */
import {PreviewStorage} from '../core'

export class MinioPreviewStorage extends PreviewStorage {
  #storage = null
  #bucket = 'preview'

  /**
   * @param storage - Minio storage
   */
  constructor(storage) {
    super()
    this.#storage = storage
  }

  async save(params) {
    return await this.#storage.putObject(this.#bucket, params.name, params.data)
  }

  async read(params) {
    return await this.#storage.getObject(this.#bucket, params.name)
  }

  async delete(params) {
    return await this.#storage.removeObject(this.#bucket, params.name)
  }
}
