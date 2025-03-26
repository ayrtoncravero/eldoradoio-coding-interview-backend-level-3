import { Item } from '../entity/Item';
import { BadRequestError } from '../errors/BadRequestError';
import { DatabaseError } from '../errors/DatabaseError';
import { ItemRepository } from '../repositories/item.repository';

export class ItemService {
    private itemRepository: ItemRepository

    constructor() {
        this.itemRepository = new ItemRepository();
    }

    /**
     * Obtiene un item por su ID.
     * @param id - Identificador del item.
     * @returns El item encontrado o `null` si no existe.
     */
    // async getItemById(id: number): Promise<Item | null> {
    //     return await this.itemRepository.findOne({ where: { id } });
    // }
    async create(item: any): Promise<Item> {
        try {
            const newItem = new Item();

            const loadedItem: Item = this.loadItem(
                newItem,
                item,
            );

            const savedItem: Item | null = await this.itemRepository.save(loadedItem);
            if(!savedItem){
                console.log('error in save item');
        
                throw new DatabaseError('error in save item')
            }
        
            return savedItem;
        } catch (error: any) {
            console.log('error in item service: ', error.message);

            throw error;
        }
    }
    private loadItem(
        newItem: Item,
        item: Item,
    ) {
        newItem.name = item.name;
        newItem.price = item.price;

        return item;
    }
};
