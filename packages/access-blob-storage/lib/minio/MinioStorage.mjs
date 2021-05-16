/* eslint-disable no-unused-vars */
import Minio from 'minio';
import {Storage} from '../core'

export class MinioStorage extends Storage {
  /**
   * @type {Minio}
   */
  #storage = null

  constructor(options) {
    super()
    this.#storage = new Minio.Client({
      endPoint: 'play.min.io',
      port: 9000,
      useSSL: true,
      accessKey: 'Q3AM3UQ867SPQQA43P2F',
      secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
    })
  }

  async listFolders() {
    return this.#storage.listBuckets();
  }

  async createFolder(folderName) {
    return this.#storage.makeBucket(folderName)
  }

  async deleteFolder(folderName) {
    return this.#storage.removeBucket(folderName)
  }

  async listBlobs(folderName, options) {
    return this.#storage.listObjects(folderName, ...options)
  }

  async readBlob(folderName, blobName) {
    return this.#storage.getObject(folderName, blobName)
  }

  async writeBlob(stream, folderName, blobName) {
    return this.#storage.putObject(folderName, blobName, stream)
  }

  async removeBlob(folderName, blobName) {
    return this.#storage.removeObject(folderName, blobName)
  }
}
