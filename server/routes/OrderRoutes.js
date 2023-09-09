import express from 'express';
const router = express.Router();

import { createOrder, getAllOrders } from '../controller/orderController.js';

router.route('/').post(createOrder);
router.route('/:userId').get(getAllOrders);

export default router;
