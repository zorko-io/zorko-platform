const BrowserKeys = {
  UserToken: 'ZORKO_APP_TOKEN',
  LastPath: 'ZORKO_APP_LAST_PATH',
}

class AppPersistentStorage {
  #local = null

  #session = null

  /**
   * @param {WindowLocalStorage} localStorage - browser local storage
   * @param {WindowSessionStorage} sessionStorage - browser session storage
   */
  constructor(localStorage, sessionStorage) {
    this.#local = localStorage
    this.#session = sessionStorage
  }

  /**
   * @method Write token to a local storage
   * @param {string} token - user JWT
   */
  writeApiToken(token) {
    this.#local.setItem(BrowserKeys.UserToken, token)
  }

  /**
   * @method Clear token in a local storage
   */
  cleanApiToken() {
    this.#local.removeItem(BrowserKeys.UserToken)
  }

  /**
   * @method Read token in a local storage
   * @return {String}
   */
  readApiToken() {
    return this.#local.getItem(BrowserKeys.UserToken)
  }

  /**
   * @method Write last location path to a local storage
   * @param {string} lastPath - last path of user location
   */
  writeLastRoutePath(lastPath) {
    this.#local.setItem(BrowserKeys.LastPath, lastPath)
  }

  /**
   * @method Remove last path from a local storage
   */
  cleanLastRoutePath() {
    this.#local.removeItem(BrowserKeys.LastPath)
  }

  /**
   * @method Read a last path from a local storage
   * @return {String}
   */
  readLastRoutePath() {
    return this.#local.getItem(BrowserKeys.LastPath)
  }
}

export const appPersistentStorage = new AppPersistentStorage(localStorage, sessionStorage)
