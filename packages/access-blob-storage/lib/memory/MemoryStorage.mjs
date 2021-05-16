import {Storage} from '../core'

export class MemoryStorage extends Storage {
  #storage = null

  constructor() {
    super()
    this.#storage = new Map()
  }

  async listFolders() {
    return [...this.#storage.keys()];
  }

  async createFolder(folderName) {
    return this.#storage.set(folderName, {})
  }

  async deleteFolder(folderName) {
    return this.#storage.delete(folderName)
  }

  async listBlobs(folderName, options) {
    const blobs = Object.keys(this.#storage.get(folderName))
    return new ReadableStream(blobs)
  }

  async readBlob(folderName, blobName) {
    const folder = this.#storage.get(folderName)
    return new ReadableStream(folder[blobName])
  }

  async writeBlob(stream, folderName, blobName) {
    const folder = this.#storage.get(folderName)
    folder[blobName] = new ArrayBuffer();
    await stream.pipeTo(folder[blobName])
    return {}
  }

  async removeBlob(folderName, blobName) {
    const folder = this.#storage.get(folderName)
    delete folder[blobName]
    return {}
  }
}
