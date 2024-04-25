import { mongooseConnect } from "../../lib/mongoose";
import { Payment } from "../../models/Payment";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { orderId, newStatus } = req.body;

  try {
    await mongooseConnect();

    const updateData = { status: newStatus };

    // If the new status is 'delivered', set the deliveryDate to now
    if (newStatus === 'delivered') {
      updateData.deliveryDate = new Date();
    }

    const updatedOrder = await Payment.findOneAndUpdate(
      { _id: orderId },
      updateData,
      { new: true }  // this returns the updated document
    ).lean();

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ error: 'Failed to update order status' });
  }
}
