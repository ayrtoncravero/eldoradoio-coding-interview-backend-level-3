import { DeleteResult, Repository } from 'typeorm';
import { Item } from '../entity/Item';
import { IItemRepository } from '../interfaces/IItemRepository';

export class ItemRepository implements IItemRepository {
    private repository: Repository<Item>;

    constructor(repository: Repository<Item>) {
        this.repository = repository;
    }

    async getOneById(id: number): Promise<Item | null> {
        return await this.repository.findOne({ where: { id } });
    }
    async save(item: Partial<Item>): Promise<Item | null> {
        return await this.repository.save(item);
    }
    merge(item: Item, updateData: any): Item {
        return this.repository.merge(item, updateData);
    }
    async getAll(): Promise<Item[] | null> {
        return await this.repository.find();
    }
    async deleteById(id: number): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }
}
