import { Router } from 'express';
import itemsRoutes from './item.route';
import pingRoutes from './ping.route';

const router: Router = Router();

router.use('/items', itemsRoutes);
router.use('/ping', pingRoutes);

export default router;