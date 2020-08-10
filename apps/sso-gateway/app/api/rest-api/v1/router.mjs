import express      from 'express';
import controllers  from './controllers/index.mjs'

const router = express.Router();


// todo: add auth routers
// todo: add context and auth layer set session and check by jwt
router.get('/users', controllers.users.showAll);
router.get('/users/:id', controllers.users.show);
router.delete('/users/:id', controllers.users.remove);
router.post('/users', controllers.users.save);

router.post('/session/create', controllers.session.create);

export default router;