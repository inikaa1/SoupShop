import { mongooseConnect } from "@/lib/mongoose";
import { Payment } from "@/models/Payment";
import { Product } from "@/models/Product";

const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }

  try {
    await mongooseConnect();

    const {
      name, email, city,
      postalCode, streetAddress, country,
      cartProducts,
    } = req.body;

    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: uniqueIds });

    let orderItems = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(p => p._id.toString() === productId);
      const quantity = productsIds.filter(id => id === productId)?.length || 0;
      if (quantity > 0 && productInfo) {
        orderItems.push({
          productName: productInfo.title,
          quantity,
          price: productInfo.price,
        });
      }
    }

    console.log('Order Items:', orderItems);

    const orderDoc = await Payment.create({
      customer: {
        name,
        email,
        address: `${streetAddress}, ${city}, ${postalCode}, ${country}`,
      },
      items: orderItems,
      status: 'paid',
    });

    const session = await stripe.checkout.sessions.create({
      line_items: orderItems.map(item => ({
        quantity: item.quantity,
        price_data: {
          currency: 'AUD',
          product_data: { name: item.productName },
          unit_amount: item.price * 100,
        },
      })),
      mode: 'payment',
      customer_email: email,
      success_url: process.env.PUBLIC_URL + '/cart?success=1',
      cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
      metadata: { orderId:orderDoc._id.toString()},
    });

  

    res.json({
      url: session.url,
    });

  } catch (error) {
    console.error('Error in checkout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
