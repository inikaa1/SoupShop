import { mongooseConnect } from "../../lib/mongoose";
import { Payment } from "../../models/Payment";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    await mongooseConnect();
    // Fetch all documents in the Payment collection
    const payments = await Payment.find({}).lean();

    return res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({ error: 'Failed to fetch payments' });
  }
}
