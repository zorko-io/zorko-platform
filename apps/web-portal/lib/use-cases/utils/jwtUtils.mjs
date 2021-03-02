import jwt from 'jsonwebtoken';
import {discoverConfig} from '../../../config';

//TODO: set config as dependency in UseCase constructor
const config = discoverConfig()

class ApiToken {
  #secret = null;

  #expiresIn = null;

  /**
   * @param {String} secret - token signature secret
   * @param {Number} expiresIn - token lifetime in seconds
   */
  constructor(secret, expiresIn) {
    this.#secret = secret;
    this.#expiresIn = expiresIn;
  }

  /**
   * @method Generate JWT
   * @param {Object} params - user details stored to the JWT
   * @return {String}
   */
  sign(params) {
    return jwt.sign({ email: params.email, expiresIn: config.auth.expiresIn }, config.auth.secret)
  }

  /**
   * @method Decode JWT
   * @param {String} token - JWT
   * @return {Object}
   */
  verify (token) {
    return jwt.verify(token, config.auth.secret)
  }
}


export const apiToken = new ApiToken({
  secret: config.auth.secret,
  expiredIn: config.auth.expiredIn
})