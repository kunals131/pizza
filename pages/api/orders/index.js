import dbConnect from "../../../utils/mongo";
import Order from '../../../models/Order'

const handler = async(req,res)=>{
    const {method} = req;
    await dbConnect();

    if (method==="GET"){
        let allOrders = await Order.find({});
        res.status(200).json(allOrders);
    }
    if (method==="POST") {
        try {
            const order = await Order.create(req.body);
            res.status(201).json(order);
        }catch(err) {
            res.status(500).json(err);
        }
    }
}

export default handler;