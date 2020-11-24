import express      from 'express';
import controllers  from './controllers/index.mjs'
import { keycloak } from '../../../utils/keycloak.mjs';

const router = express.Router();


// todo: remove unused endpoint
// todo: add keycloak protect on routes
// todo: add example protected and not protected endpoint

router.get('/users', controllers.users.showAll);
router.get('/users/:id', controllers.users.show);
router.delete('/users/:id', controllers.users.remove);
router.post('/users', controllers.users.save);

router.post('/session/create', controllers.session.create);


router.get('/info/protected', keycloak.protect(), controllers.info.show);
router.get('/info/opened', controllers.info.show);

export default router;
