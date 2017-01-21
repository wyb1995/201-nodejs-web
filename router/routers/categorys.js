import {Router} from 'express';
import CategoryController from '../../controller/CategoryController';

const categoryCtrl = new CategoryController();
const router = Router();

router.get('/', categoryCtrl.getAllCategory);
router.get('/:categoryId', categoryCtrl.getOneCategory);
router.post('/', categoryCtrl.addCategory);
router.delete('/:categoryId', categoryCtrl.deleteCategory);
router.put('/:categoryId', categoryCtrl.updateCategory);
router.post('/:categoryId/item', categoryCtrl.addNewItemToCategory);
router.post('/:categoryId/item/:itemId', categoryCtrl.addOldItemToCategory);
router.delete('/:categoryId/item/:itemId', categoryCtrl.deleteItemFromCategory);

export default router;