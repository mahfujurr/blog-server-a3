import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { UserValidation } from '../user/user.validation';

const router = express.Router();


router.post('/register', validateRequest(UserValidation.userValidationSchema), AuthControllers.register);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

export const AuthRoutes = router;
