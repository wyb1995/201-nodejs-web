import items from './routers/items';
import category from './routers/categorys';
import cart from './routers/cart';

export default function (app) {
  app.use('/items', items);
  app.use('/category', category);
  app.use('/cart', cart);
}