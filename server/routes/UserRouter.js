import express from 'express';
const router = express.Router();

import {
  addAddress,
  getAllAddresses,
  getSingleUser,
} from '../controller/userController.js';

router.route('/add-address').post(addAddress);
router.route('/addresses/:userId').get(getAllAddresses);
router.route('/profile/:userId').get(getSingleUser);

export default router;
