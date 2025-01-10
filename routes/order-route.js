import { Router } from 'express';
const router = Router();

import { getOrders, postOrder, getOrderDetail, deleteOrder, oAuthGerencianet, createPixBilling, getQrCode } from '../controllers/order-controller';

router.get('/',                         getOrders);
router.post('/',                        postOrder);
router.get('/:orderId',                 getOrderDetail);
router.delete('/:orderId',              deleteOrder);

router.post('/:orderId/pix/billing',    oAuthGerencianet,
                                        createPixBilling,
                                        getQrCode)

export default router;