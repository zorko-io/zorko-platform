/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class Storage {
  /**
   * @method Returns all folders list
   * @return {Promise<Array<Object>>}
   */
  listFolders() {
    throw new NotYetImplementedError()
  }

  /**
   * @method Creates folder for blob storage
   * @param {string} folderName - folder name
   * @return {Promise<Object>}
   */
  createFolder(folderName) {
    throw new NotYetImplementedError()
  }

  /**
   * @method Removes folder in blob storage
   * @param {string} folderName - folder name
   * @return {Promise<Object>}
   */
  deleteFolder(folderName) {
    throw new NotYetImplementedError()
  }

  /**
   * @method Returns all folders list
   * @param {string} folderName - folder name
   * @param {Object} options - options
   * @return {Promise<ReadableStream>}
   */
  listBlobs(folderName, options) {
    throw new NotYetImplementedError()
  }

  /**
   * @method Returns blob
   * @param {string} folderName - folder name
   * @param {string} blobName - blob options
   * @return {Promise<ReadableStream>}
   */
  readBlob(folderName, blobName) {
    throw new NotYetImplementedError()
  }

  /**
   * @method Write blob
   * @param {ReadableStream} stream - stream
   * @param {string} folderName - folder name
   * @param {string} blobName - blob name
   * @return {Promise<Object>}
   */
  writeBlob(stream, folderName, blobName) {
    throw new NotYetImplementedError()
  }

  /**
   * @method Returns blob
   * @param {string} folderName - folder name
   * @param {string} blobName - blob name
   * @return {Promise<Object>}
   */
  removeBlob(folderName, blobName) {
    throw new NotYetImplementedError()
  }
}
