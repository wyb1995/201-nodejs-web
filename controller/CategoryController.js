import Category from '../model/category';
import SuperMarket from '../model/supermarket';
import async from 'async';

export default class CategoryController {
  getAllCategory(req, res, next) {
    Category.find({}, (err, doc)=> {
      if(err){
        return next(err);
      }

      return res.send(doc);
    })
  }

  getOneCategory(req, res, next) {
    let categoryId = req.params.categoryId;
    Category.findOne({categoryId})
      .populate('item')
      .exec((err, doc) => {
        if (err) {
          return next(err);
        }
        return res.send(doc);
      });
  }

  addCategory(req, res, next) {
    let categoryId = req.body.categoryId;
    let categoryName = req.body.categoryName;

    Category.create({categoryId, categoryName});
    return res.sendStatus(201);
  }

  deleteCategory(req, res, next) {
    let categoryId = req.params.categoryId;

    Category.remove({categoryId}, (err) => {
      if (err) {
        return next(err);
      }
      return res.sendStatus(204);
    });
  }

  updateCategory(req, res, next) {
    let categoryId = req.params.categoryId;
    let categoryName = req.body.categoryName;

    Category.update({categoryId}, {categoryName}, (err) => {
      if (err) {
        return next(err);
      }
      return res.sendStatus(204);
    });
  }

  addNewItemToCategory(req, res, next) {
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
    let categoryId = req.params.categoryId;

    async.waterfall([
      (done) => {
        SuperMarket.create({id, name, price}, (err, doc) => {
          done(err, doc);
        });
      },
      (doc, done) => {
        Category.findOne({categoryId}, (err, docs) => {

          if (err) {
            done(err, docs);
          }

          if (!docs) {
            done(true, null);
          }

          docs.item.push(doc._id);

          docs.save(done);
        })
      }
    ], (err) => {
      if (err === true) {
        return res.sendStatus(404);
      }

      if (err) {
        return next(err);
      }

      return res.sendStatus(201);
    })
  }

  addOldItemToCategory(req, res, next) {
    let categoryId = req.params.categoryId;
    let itemId = req.params.itemId;

    async.waterfall([
      (done) => {
        Category.findOne({'item': itemId}, done);
      },
      (doc, done)=> {
        if(doc){
          let index = doc.item.indexOf(itemId);
          doc.item.splice(index, 1);
          doc.save((err, doc)=> {
            done(err, doc);
          });
        }else {
          done(null, null)
        }
      },
      (data, done) => {
        Category.findOne({categoryId}, done);
      },
      (doc, done)=> {
        doc.item.push(itemId);
        doc.save(done);
      }
    ], (err) => {
      if (err) {
        return next(err);
      }

      return res.sendStatus(204);
    })
  }

  deleteItemFromCategory(req, res, next) {
    let categoryId = req.params.categoryId;
    let itemId = req.params.itemId;

    async.waterfall([
      (done)=> {
        Category.findOne({categoryId}, done);
      },
      (doc, done)=> {
        if(doc){
          let index = doc.item.indexOf(itemId);
          doc.item.splice(index, 1);
          doc.save((err, doc)=> {
            done(err, doc);
          });
        }else {
          done(null, null)
        }
      }
    ], (err)=> {
      if(err){
        return next(err);
      }

      return res.sendStatus(204);
    })
  }
}