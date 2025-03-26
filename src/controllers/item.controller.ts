import { NextFunction, Request, Response } from 'express';
import { ItemService } from '../services/item.service';
import Joi from 'joi';
import { createItemValidate } from '../validators/createItem.validate';
import { BadRequestError } from '../errors/BadRequestError';
import IItem from '../interfaces/IItem';
import { Item } from '../entity/Item';
import { ItemRepository } from '../repositories/item.repository';
import { NotFoundError } from '../errors/NotFoundError';
import { getItemById } from '../validators/getItemById.validate';
import { updateItemById } from '../validators/updateItemById.validate';
import { DatabaseError } from '../errors/DatabaseError';
import { deleteItemById } from '../validators/deleteItemById.validate';

export class ItemController {
	private itemService: ItemService;
    private itemRepository: ItemRepository

    constructor() {
        this.itemService = new ItemService();
        this.itemRepository = new ItemRepository();
    };

    async create(req: Request, res: Response, next: NextFunction): Promise<Response | any> {
        // TODO: (Ver si agrego)Agregar dto directamente para hacer las validaciones ahi

        const { name, price } = req.body;

        const data: IItem = {
            name,
            price,
        };

        const validation: Joi.ValidationResult<any> = createItemValidate(data);
        if (validation.error) {
            console.log('error validation in create item: ', validation.error.message);

            throw new BadRequestError(`${validation.error.message}`);
        }

        let item: Item | null = null;

        try {
            item = await this.itemService.create(data);
        } catch (error: any) {
            console.log('error in create item controller: ', error.message);

            return next(error);
        }

        return res.status(201).json(item);
    }
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
    async update(req: Request, res: Response, next: NextFunction) {
        const id: number = parseInt(req.params.id);
        const { name, price } = req.body;

        try {
            const validation: Joi.ValidationResult<any> = updateItemById({ id, name, price });
            if (validation.error) {
                console.log('error validation in get item by id: ', validation.error.message);

                throw new BadRequestError(`${validation.error.message}`);
            }

            let item: Item | null = await this.itemRepository.getOneById(id);
            if (!item) {
                console.log('item not found');
    
                throw new NotFoundError('item not found');
            }

            item = this.itemRepository.merge(item, req.body);

            const savedItem: Item | null= await this.itemRepository.save(item);
            if(!savedItem) {
                console.log('error in save item');
    
                throw new DatabaseError('error in save item');
            }

            return res.json(item);
        } catch (error: any) {
            console.error('error in update item: ', error.message);

            return next(error);
        }
    }
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
