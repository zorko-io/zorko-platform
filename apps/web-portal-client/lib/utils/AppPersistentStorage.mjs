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
  set apiToken(token) {
    if (!token) {
      this.#local.removeItem(BrowserKeys.UserToken)
    } else {
      this.#local.setItem(BrowserKeys.UserToken, token)
    }
  }

  /**
   * @method Read token in a local storage
   * @return {string|null}
   */
  get apiToken() {
    return this.#local.getItem(BrowserKeys.UserToken)
  }

  /**
   * @method Write last location path to a local storage
   * @param {string|null} lastPath - last path of user location
   */
  set lastRoutePath(lastPath) {
    if (!lastPath) {
      this.#local.removeItem(BrowserKeys.LastPath)
    } else {
      this.#local.setItem(BrowserKeys.LastPath, lastPath)
    }
  }

  /**
   * @method Read a last path from a local storage
   * @return {string|null}
   */
  get lastRoutePath() {
    return this.#local.getItem(BrowserKeys.LastPath)
  }
}

export const appPersistentStorage = new AppPersistentStorage(localStorage, sessionStorage)
