import AppDataSource from '../../config/database';
import { ItemRepository } from '../../repositories/item.repository';
import { ItemService } from '../../services/item.service';
import { ItemController } from '../../controllers/item.controller';
import { Item } from '../../entity/Item';

let itemController: ItemController | null = null;

export async function getItemController() {
  if (!itemController) {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    const itemRepository = new ItemRepository(AppDataSource.getRepository(Item));
    const itemService = new ItemService(itemRepository);
    itemController = new ItemController(itemService, itemRepository);
  }
  
  return itemController;
}
