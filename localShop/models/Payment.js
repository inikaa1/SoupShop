import {model, models, Schema} from "mongoose";

const PaymentSchema = new Schema({
customer: {
  name: String,
  email: String,
  address: String,
},
items: [
  {
    productName: String,
    quantity: Number,
    price: Number,
  },
],
status: {
  type: String,
  enum: ['paid', 'processed', 'shipped', 'delivered'],
  default: 'paid',
},
orderDate: {
  type: Date,
  default: Date.now,
},
deliveryDate: Date,
});

export const Payment = models?.Payment || model('Payment', PaymentSchema);