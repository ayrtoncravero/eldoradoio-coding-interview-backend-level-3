import { Router } from 'express';
import { PingController } from '../controllers/ping.controller';
const router = Router();
const pingController = new PingController();

router.get('/', pingController.get.bind(pingController));

export default router;
