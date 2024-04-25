import { mongooseConnect } from "@/lib/mongoose";
import mongoose from "mongoose";
import User from "@/models/User"; 

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    switch (method) {
        case "GET":
            try {
                const users = await User.find();
                res.json(users);
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch users.' });
            }
            break;

            case "DELETE":
                try {
                    const userId = req.query?.id;
                    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
                        const result = await User.deleteOne({ _id: userId });
            
                        if (result.deletedCount === 0) {
                            return res.status(404).json({ error: 'User not found.' });
                        } 
                        res.json(true);
                    } else {
                        res.status(400).json({ error: 'Valid user ID must be provided.' });
                    }
                } catch (error) {
                    res.status(500).json({ error: 'Failed to delete user.' });
                }
                break;
                
        default:
            res.setHeader('Allow', ['GET', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
