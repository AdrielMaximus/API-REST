import { Router } from 'express';
const router = Router();
import multer, { diskStorage } from 'multer';
import { required } from '../middleware/login';

import { getProducts, postProduct, getProductDetail, updateProduct, deleteProduct, postImage, getImages } from '../controllers/product-controller';

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', getProducts);

router.post(
    '/',
    required,
    upload.single('image'),
    postProduct
);
router.get('/:productId', getProductDetail);
router.patch('/:productId', required, updateProduct);
router.delete('/:productId', required, deleteProduct);

// imagens
router.post(
    '/:productId/image',
    required,
    upload.single('image'),
    postImage
)
router.get(
    '/:productId/images',
    getImages
)

export default router;