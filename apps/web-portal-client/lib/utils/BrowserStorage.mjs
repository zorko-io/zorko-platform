export class BrowserStorage {
  static setSessionStorageValue(key, value) {
    sessionStorage.setItem(key, value)
  }

  static getSessionStorageValue(key) {
    return sessionStorage.getItem(key)
  }

  static removeSessionStorageValue(key) {
    return sessionStorage.removeItem(key)
  }

  static setLocalStorageValue(key, value) {
    localStorage.setItem(key, value)
  }

  static getLocalStorageValue(key) {
    return localStorage.getItem(key)
  }

  static removeLocalStorageValue(key) {
    return localStorage.removeItem(key)
  }
}

export const BrowserKeys = {
  UserToken: 'ZORKO_APP_TOKEN',
  LastPath: 'ZORKO_APP_LAST_PATH',
}
