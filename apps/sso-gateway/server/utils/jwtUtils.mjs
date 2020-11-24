import jwt      from 'jsonwebtoken';
import config   from '../config.cjs';


export function generateToken(object) {
    return jwt.sign({
        id: object.id,
        // todo add expiire date to config
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, config.auth.secret)
}

export function verifyToken(token) {
    return jwt.verify(token, config.auth.secret);
}