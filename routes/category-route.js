import { Router } from 'express';
const router = Router();
import { required } from '../middleware/login';

import { getCategories, postCategory } from '../controllers/category-controller';

router.get('/', getCategories);
router.post('/', required, postCategory);

export default router;