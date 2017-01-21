import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: Number,
  item: [{
    type: Schema.Types.ObjectId,
    ref: 'SuperMarket'
  }]
});

export default mongoose.model('Cart', CartSchema);