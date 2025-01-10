import { Router } from 'express';
const router = Router();

import { createUser, Login } from '../controllers/user-controller';

router.post('/', createUser);
router.post('/login', Login)

export default router;