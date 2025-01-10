import { Router } from 'express';
const router = Router();
import { required } from '../middleware/login';

import { deleteImage } from '../controllers/image-controller';

router.delete('/:imageId', required, deleteImage);

export default router;