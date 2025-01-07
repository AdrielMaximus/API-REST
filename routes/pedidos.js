import { Router } from 'express';
const router = Router();
router.get('/', (req, res, next) => {
    res.status(200).send({
        message: 'Handling GET requests to /products'
    });
});
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(200).send({
        message: 'Handling POST requests to /products',
        product: product
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).send({
        message: 'Deleted product!'
    });
});

export default router;