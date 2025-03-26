import { Router } from 'express';
import itemsRoutes from './item.route';
import healthRoutes from './health.route';

const router: Router = Router();

router.use('/items', itemsRoutes);
router.use('/health', healthRoutes);

export default router;