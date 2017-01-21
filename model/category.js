import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryId: Number,
  categoryName: String,
  item: [{
      type: Schema.Types.ObjectId,
      ref: 'SuperMarket'
  }]
});

export default mongoose.model('Category', CategorySchema);