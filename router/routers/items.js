import {Router} from 'express';
import ItemController from '../../controller/ItemController';


const router = Router();
const itemCtrl = new ItemController();

router.get('/', itemCtrl.getAll);
router.post('/', itemCtrl.addItem);
router.get('/:id', itemCtrl.getOneItem);
router.delete('/:id', itemCtrl.deleteOneItem);
router.put('/:id', itemCtrl.updateItem);

export default router;