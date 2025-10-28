import { Router } from 'express';
import healthRoutes from './modules/health/health.route.js';
import userRoutes from './modules/users/user.route.js';

const router = Router();
router.use(healthRoutes);
router.use('/users', userRoutes);
export default router;
