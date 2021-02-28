import jwt from 'jsonwebtoken';
import {discoverConfig} from '../../../config';

const config = discoverConfig()

export function generateToken(params) {
  return jwt.sign({ email: params.email, expiresIn: config.auth.expiresIn }, config.auth.secret)
}

export function verifyToken(token) {
  return jwt.verify(token, config.auth.secret)
}
