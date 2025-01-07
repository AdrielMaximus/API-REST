import { Router } from 'express';
const router = Router();
router.get('/', (req, res, next) => {
    res.status(200).send({
        message: 'Handling GET requests to /products'
    });
});
router.post('/', (req, res, next) => {
    res.status(200).send({
        message: 'Handling POST requests to /products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).send({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).send({
            message: 'You passed an ID'
        });
    }
});
router.patch('/:productId', (req, res, next) => {
    res.status(200).send({
        message: 'Updated product!'
    });
});
router.delete('/:productId', (req, res, next) => {
    res.status(200).send({
        message: 'Deleted product!'
    });
});

export default router;