import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';
const router = Router();
const itemController = new ItemController();

router.post('/', itemController.create.bind(itemController));
router.get('/', itemController.getAll.bind(itemController));
router.get('/:id', itemController.getById.bind(itemController));
router.patch('/:id', itemController.update.bind(itemController));
router.delete('/:id', itemController.delete.bind(itemController));

export default router;
