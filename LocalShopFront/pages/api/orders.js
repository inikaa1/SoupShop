import { mongooseConnect } from "../../lib/mongoose";
import { Payment } from "../../models/Payment";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email query parameter is required' });
  }

  try {
    await mongooseConnect();
    const orders = await Payment.find({ "customer.email": email }).lean();

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
