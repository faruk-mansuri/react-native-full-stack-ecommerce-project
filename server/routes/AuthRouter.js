import express from 'express';
const router = express.Router();

import {
  register,
  login,
  logout,
  verifyEmail,
} from '../controller/authController.js';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';

router.route('/register').post(validateRegisterInput, register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/verify/:token').get(verifyEmail);

export default router;
