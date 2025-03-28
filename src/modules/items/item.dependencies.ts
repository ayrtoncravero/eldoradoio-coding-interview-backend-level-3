import AppDataSource from '../../config/database';
import { ItemRepository } from '../../repositories/item.repository';
import { ItemService } from '../../services/item.service';
import { ItemController } from '../../controllers/item.controller';
import { Item } from '../../entity/Item';

const itemRepository = new ItemRepository(AppDataSource.getRepository(Item));
const itemService = new ItemService(itemRepository);
const itemController = new ItemController(itemService, itemRepository);

export { itemController };
