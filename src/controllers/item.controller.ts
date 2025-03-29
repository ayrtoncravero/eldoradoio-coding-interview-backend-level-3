import { NextFunction, Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import Joi from 'joi';
import { BadRequestError } from '../errors/BadRequestError';
import { Item } from '../entity/Item';
import { ItemRepository } from '../repositories/item.repository';
import { NotFoundError } from '../errors/NotFoundError';
import { getItemById } from '../validators/getItemById.validate';
import { DatabaseError } from '../errors/DatabaseError';
import { deleteItemById } from '../validators/deleteItemById.validate';
import { UpdateItemDto } from '../dtos/updateItem.dto';
import { CreateItemDto } from '../dtos/createItem.dto';

export class ItemController {
    constructor(
        private readonly itemService: ItemService,
        private readonly itemRepository: ItemRepository,
    ) {}

    /**
     * @swagger
     * /items:
     *   post:
     *     summary: Crear un nuevo item
     *     description: Crea un nuevo item en la base de datos. Valida los datos antes de crear el item.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               price:
     *                 type: number
     *             required:
     *               - name
     *               - price
     *     responses:
     *       201:
     *         description: Item creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 price:
     *                   type: number
     *       400:
     *         description: Error de validación en los datos proporcionados
     *       500:
     *         description: Error en el servidor
     */
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        try {
            const itemDto: CreateItemDto = req.body;

            let item: Item | null = await this.itemService.create(itemDto);

            return res.status(201).json(item);
        } catch (error: any) {
            console.log('error in create item: ', error.message);

            next(error);
        }
    }
    /**
     * @swagger
     * /items:
     *   get:
     *     summary: Obtener todos los items
     *     description: Obtiene todos los items almacenados en la base de datos.
     *     responses:
     *       200:
     *         description: Lista de items
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     *                   price:
     *                     type: number
     *       404:
     *         description: No se encontraron items
     *       500:
     *         description: Error en el servidor
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const items: Item[] | null = await this.itemRepository.getAll();
            if(!items) {
                console.log('items not found');

                throw new NotFoundError('items not found');
            }

            return res.status(200).json(items);
        } catch (error: any) {
            console.error('error in find all items: ', error);

            return next(error);
        }
    }
    /**
     * @swagger
     * /items/{id}:
     *   get:
     *     summary: Obtener un item por su ID
     *     description: Devuelve el item con el ID especificado.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: El ID del item a obtener
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Item encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 price:
     *                   type: number
     *       400:
     *         description: Error de validación en el ID proporcionado
     *       404:
     *         description: Item no encontrado
     *       500:
     *         description: Error en el servidor
     */
    async getById(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);

        const validation: Joi.ValidationResult<any> = getItemById({ id });
        if (validation.error) {
            console.log('error validation in get item by id: ', validation.error.message);

            throw new BadRequestError(`${validation.error.message}`);
        }

        try {
            const item = await this.itemRepository.getOneById(id);
            if (!item) {
                console.log('item not found');
    
                throw new NotFoundError('item not found');
            }

            return res.status(200).json(item);
        } catch (error: any) {
            console.error('error in get item by id: ', error.message);

            return next(error);
        }
    }
    /**
     * @swagger
     * /items/{id}:
     *   patch:
     *     summary: Actualizar un item por su ID
     *     description: Actualiza los detalles de un item específico por su ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: El ID del item a actualizar
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               price:
     *                 type: number
     *             required:
     *               - name
     *               - price
     *     responses:
     *       200:
     *         description: Item actualizado correctamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 price:
     *                   type: number
     *       400:
     *         description: Error de validación en los datos proporcionados
     *       404:
     *         description: Item no encontrado
     *       500:
     *         description: Error en el servidor
     */
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = parseInt(req.params.id);
            if (isNaN(id) || id <= 0) {
                console.log('invalid id in update item');

                throw new BadRequestError('invalid id');
            }

            const itemDto: UpdateItemDto = req.body;

            let item: Item | null = await this.itemRepository.getOneById(id);
            if (!item) {
                console.log('item not found');
    
                throw new NotFoundError('item not found');
            }

            item = this.itemRepository.merge(item, itemDto);

            const savedItem: Item | null = await this.itemRepository.save(item);
            if(!savedItem) {
                console.log('error in save item');
    
                throw new DatabaseError('error in save item');
            }

            return res.json({
                ...savedItem,
                price: Number(savedItem.price),
            });
        } catch (error: any) {
            console.error('error in update item: ', error.message);

            return next(error);
        }
    }
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
     *         description: El ID del item a eliminar
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Item eliminado correctamente
     *       400:
     *         description: Error de validación en el ID proporcionado
     *       404:
     *         description: Item no encontrado
     *       500:
     *         description: Error en el servidor
     */
    async delete(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);

        const validation: Joi.ValidationResult<any> = deleteItemById({ id });
        if (validation.error) {
            console.log('error validation in delete item by id: ', validation.error.message);

            throw new BadRequestError(`${validation.error.message}`);
        }

        try {
            const result = await this.itemRepository.deleteById(id);
            if (result.affected === 0) {
                console.log('item not found');

                throw new NotFoundError('item not found');
            }

            return res.status(204).send();
        } catch (error: any) {
            console.error('error deleting item: ', error.message);
        
            return next(error);
        }
    }
}
