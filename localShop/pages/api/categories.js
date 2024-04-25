import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req,res){
    const {method} = req;
    await mongooseConnect();
    if(method === "GET"){
        res.json(await Category.find().populate("parent"))
    }
    if(method === "POST"){
        const {name,parent,properties} = req.body;
        const categoryDoc = await Category.create({name,parent,properties});
        res.json(categoryDoc);
    }
    if (method === "PUT") {
        const {name,parent,properties,_id} = req.body;
        await Category.updateOne({_id},{name,parent,properties})
        res.json(true)
    }
    if (method === "DELETE") {
        if (req.query?.id) {
            await Category.deleteOne({ _id: req.query.id });
            res.json(true);
        }
    } 
}