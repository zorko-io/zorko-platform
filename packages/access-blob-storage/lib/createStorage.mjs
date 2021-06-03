/**
 * Create blob storage
 */
import {MemoryStorage} from './memory'
import {MinioStorage} from './minio'

export const ClientTypes = {
  Minio: 'minio',
  Memory: 'memory',
}

/**
 * @param {Object} configs - client configs
 * @param {String} configs.type ['minio'] - control implementation 'memory' or 'minio'
 * @param {Object} configs.options - Blob Storage options
 * @return {Storage}
 */

export function createStorage(configs = {type: ClientTypes.Memory}) {
  const {type, options} = configs

  if (ClientTypes.Memory === type) {
    return new MemoryStorage()
  }

  return new MinioStorage(options)
}
