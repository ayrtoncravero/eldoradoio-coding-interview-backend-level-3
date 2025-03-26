import { DeleteResult } from 'typeorm';
import { Item } from '../entity/Item';

export interface IItemRepository {
	getOneById(id: number): Promise<Item | null>;
	save(item: Item): Promise<Item | null>;
	merge(item: Item, updateData: any): Item;
	getAll(): Promise<Item[] | null>;
	deleteById(id: number): Promise<DeleteResult>;
}