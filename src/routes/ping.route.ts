import { Router } from 'express';
import { PingController } from '../controllers/ping.controller';
const router = Router();
const pingController = new PingController();

/**
* @swagger
* /:
*   get:
*     description: Devuelve un mensaje de estado 'pong' para verificar si el servidor está activo.
*     responses:
*       200:
*         description: El servidor está activo y responde correctamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: 'pong'
*/
router.get('/', pingController.get.bind(pingController));

export default router;
