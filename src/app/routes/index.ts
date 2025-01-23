import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BlogRoutes } from '../modules/blog/blog.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
