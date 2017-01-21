import {Router} from 'express';
import CartController from '../../controller/cartController';

const router = new Router();
const cartCtrl = new CartController();

router.get('/', cartCtrl.getCart);
router.get('/:userId', cartCtrl.getOneUserCart);
router.post('/:userId/items/:itemId', cartCtrl.addItemToCart);
router.delete('/:userId/items/:itemId', cartCtrl.deleteItemFromCart);
router.delete('/:userId/items', cartCtrl.removeUserAllItem);
router.post('/:userId', cartCtrl.addCart);

export default router;