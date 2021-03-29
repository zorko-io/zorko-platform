/* eslint-disable no-unused-vars */
import Minio from 'minio';
import {Storage} from '../core'
import {MinioPreviewStorage} from './MinioPreviewStorage'

export class MinioStorage extends Storage {
  #preview = null

  constructor(options) {
    super()
    const instance = new Minio.Client({
      endPoint: 'play.min.io',
      port: 9000,
      useSSL: true,
      accessKey: 'Q3AM3UQ867SPQQA43P2F',
      secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
    })

    this.#preview = new MinioPreviewStorage(instance)
  }

  get preview() {
    return this.#preview
  }
}
