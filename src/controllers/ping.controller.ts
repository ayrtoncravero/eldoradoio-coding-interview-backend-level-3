import { NextFunction, Request, Response } from 'express';

export class PingController {
    /**
     * @swagger
     * /items:
     *   get:
     *     description: Obtiene un estado de "OK" para verificar si la API está funcionando correctamente.
     *     responses:
     *       200:
     *         description: Respuesta exitosa que indica que la API está funcionando correctamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: true
     *       500:
     *         description: Error interno del servidor.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Internal Server Error"
     */
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('OK');

            return res.status(200).json({
                ok: true,
            });
        } catch (error: any) {
            console.log('error fetching items: ', error.message);

            next(error)
        }
    }
}
