import express from 'express';


import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin), // Only allow admins
  AdminControllers.blockUser // Controller to handle the logic
);
router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin), // Only allow admins
  AdminControllers.deleteSingleBlog // Controller to handle the logic
);


export const AdminRoutes = router;
