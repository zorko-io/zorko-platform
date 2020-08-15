import bodyParser       from 'body-parser';
import session          from 'express-session';
import cors             from 'cors';
import { keycloak }     from '../../utils/keycloak.mjs';


const memoryStore = new session.MemoryStore();

export default {
    urlencoded: bodyParser.urlencoded({ extended: true }),

    json: bodyParser.json({
        limit  : 1024 * 1024,
        verify : (req, res, buf) => {
            try {
                JSON.parse(buf);
            } catch(e) {
                res.send({
                    status: 0,
                    error: {
                        message: 'Please verify your json'
                    }
                });
                throw new Error('BROKEN_JSON');
            }
        }
    }),

    cors: cors({ origin: '*' }),

    keycloak: keycloak.middleware(),

    session: session({
        name: 'sso-gateway',
        secret: 'some random secret',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    })
}