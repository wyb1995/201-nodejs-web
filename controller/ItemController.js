import SuperMarket from '../model/supermarket';

export default class ItemController {
  getAll(req, res, next) {
    SuperMarket.find({}, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.send(doc);
    })
  }

  addItem(req, res, next) {
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;

    SuperMarket.create({id, name, price});
    return res.send('create')
  }

  getOneItem(req, res, next) {
    let id = req.params.id;

    SuperMarket.findOne({id}, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.send(doc.toJSON());
    })
  }

  deleteOneItem(req, res, next) {
    let id = req.params.id;

    SuperMarket.remove({id}, (err) => {
      if (err) {
        return next(err);
      }

      return res.send('delete over');
    })
  }

  updateItem(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let price = req.body.price;

    SuperMarket.update({id}, {name, price}, (err) => {
      if (err) {
        return next(err);
      }

      return res.send('update over');
    })
  }
}
