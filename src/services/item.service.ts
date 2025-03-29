import { CreateItemDto } from '../dtos/createItem.dto';
import { Item } from '../entity/Item';
import { DatabaseError } from '../errors/DatabaseError';
import { ItemRepository } from '../repositories/item.repository';

export class ItemService {
    constructor(
        private readonly itemRepository: ItemRepository,
    ) {};

    async create(itemDto: CreateItemDto): Promise<Item> {
        try {
            const newItem = new Item();

            const loadedItem: Item = this.loadItem(
                newItem,
                itemDto,
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
        itemDto: CreateItemDto,
    ) {
        if (itemDto.name !== undefined) {
            newItem.name = itemDto.name;
        }
    
        if (itemDto.price !== undefined) {
            newItem.price = itemDto.price;
        }
    
        return newItem;
    }
};
