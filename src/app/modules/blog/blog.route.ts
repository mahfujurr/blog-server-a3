import express from 'express';
import { blogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidationSchema } from './blog.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import checkBlogOwnership from '../../middlewares/checkBlogOwnership';
const router = express.Router();
router.post('/', auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(blogValidationSchema.createBlogValidationSchema), blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getSingleBlog);
router.patch('/:id', auth(USER_ROLE.admin, USER_ROLE.user), checkBlogOwnership(), validateRequest(blogValidationSchema.updateBlogValidationSchema), blogController.updateBlog);
router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.user), checkBlogOwnership(), blogController.deleteBlog);

export const BlogRoutes = router;
