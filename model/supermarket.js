import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const SupermarketSchema = new Schema({
  id: Number,
  name: String,
  price: String
});

const SuperMarket = mongoose.model('SuperMarket', SupermarketSchema);

export default SuperMarket;