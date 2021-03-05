import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'

/**
 * Convert file Url to the file's folder name
 * @param url - location of file, expect for file://
 * @param postfix - postfix path, for example to go up use '../'
 */
export function fromUrlToDirPath(url, postfix = '') {
  const dir = dirname(fileURLToPath(url))

  if (postfix) {
    return resolve(dir, postfix)
  }

  return dir
}
