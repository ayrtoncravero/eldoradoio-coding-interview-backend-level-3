import { Router } from 'express';
import { getItemController } from '../modules/items/item.dependencies';

const router = Router();

(async () => {
    const itemController = await getItemController();

    /**
     * @swagger
     * /items:
     *   post:
     *     summary: Crear un nuevo item
     *     description: Crea un nuevo item en la base de datos.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nombre:
     *                 type: string
     *                 description: Nombre del item.
     *               descripcion:
     *                 type: string
     *                 description: Descripción detallada del item.
     *               precio:
     *                 type: number
     *                 format: float
     *                 description: Precio del item.
     *     responses:
     *       201:
     *         description: Item creado correctamente
     *       400:
     *         description: Error en la solicitud
     */
    router.post('/', itemController.create.bind(itemController));

    /**
     * @swagger
     * /items:
     *   get:
     *     summary: Obtener todos los items
     *     description: Devuelve una lista de todos los items disponibles.
     *     responses:
     *       200:
     *         description: Lista de items
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Item'
     *       500:
     *         description: Error en el servidor
     */
    router.get('/', itemController.getAll.bind(itemController));

    /**
     * @swagger
     * /items/{id}:
     *   get:
     *     summary: Obtener un item por su ID
     *     description: Devuelve un item específico por su ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: El ID del item.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Item encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Item'
     *       404:
     *         description: Item no encontrado
     */
    router.get('/:id', itemController.getById.bind(itemController));

    /**
     * @swagger
     * /items/{id}:
     *   patch:
     *     summary: Actualizar un item por su ID
     *     description: Actualiza los detalles de un item específico.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: El ID del item.
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nombre:
     *                 type: string
     *                 description: Nombre del item.
     *               descripcion:
     *                 type: string
     *                 description: Descripción del item.
     *               precio:
     *                 type: number
     *                 format: float
     *                 description: Nuevo precio del item.
     *     responses:
     *       200:
     *         description: Item actualizado correctamente
     *       404:
     *         description: Item no encontrado
     *       400:
     *         description: Error en la solicitud
     */
    router.patch('/:id', itemController.update.bind(itemController));

    /**
     * @swagger
     * /items/{id}:
     *   delete:
     *     summary: Eliminar un item por su ID
     *     description: Elimina un item de la base de datos por su ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: El ID del item a eliminar.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Item eliminado correctamente
     *       404:
     *         description: Item no encontrado
     */
    router.delete('/:id', itemController.delete.bind(itemController));
})();

export default router;
