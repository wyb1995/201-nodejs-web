import Cart from '../model/cart';
import async from 'async';

export default class cartController {
  getCart(req, res, next) {
    Cart.find({})
      .populate('item')
      .exec((err, doc) => {
      if (err) {
        return next(err);
      }

      return res.send(doc);
    });
  }

  getOneUserCart(req, res, next) {
    let userId = req.params.userId;
    Cart.findOne({userId})
      .populate('item')
      .exec((err, doc) => {
        if (err) {
          return next(err);
        }

        return res.send(doc);
      })
  }

  addItemToCart(req, res, next) {
    let userId = req.params.userId;
    let itemId = req.params.itemId;

    async.waterfall([
      (done) => {
        Cart.findOne({userId}, done);
      },
      (doc, done) => {
        doc.item.push(itemId);
        doc.save(done);
      }
    ], (err) => {
      if (err) {
        return next(err);
      }

      return res.sendStatus(201);
    })
  }

  deleteItemFromCart(req, res, next) {
    let userId = req.params.userId;
    let itemId = req.params.itemId;

    async.waterfall([
      (done) => {
        Cart.findOne({userId}, done);
      },
      (doc, done) => {
        if (doc) {
          let index = doc.item.indexOf(itemId);
          doc.item.splice(index, 1);
          doc.save((err, doc) => {
            done(err, doc);
          });
        } else {
          done(null, null);
        }
      }
    ], (err)=> {
      if(err){
        return next(err);
      }

      return res.sendStatus(204);
    })
  }

  removeUserAllItem(req, res, next) {
    let userId = req.params.userId;

    async.waterfall([
      (done) => {
        Cart.findOne({userId}, done);
      },
      (doc, done) => {
        doc.item = [];
        doc.save(done)
      }
    ], (err)=> {
      if(err){
        return next(err);
      }

      return res.sendStatus(204);
    })
  }

  addCart(req, res, next) {
    let userId = req.params.userId;

    Cart.create({userId});

    return res.sendStatus(201);
  }
}