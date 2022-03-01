import dbConnect from "../../../utils/mongo";
import Order from "../../../models/Order";
import mongoose from 'mongoose';
import Product from "../../../models/Product";

export default async function handler(req, res) {
    const {method,query: {id}} = req;
    dbConnect();
    mongoose.connection.once('open', ()=>{
        console.log('Connection SETUP')
    })
    if (method==="GET") {
        try {
            const order = await Order.findById(id);
            res.status(200).json(order);
        }catch(err) {
            res.status(500).json(err);
        }
    }
    if (method==="PUT"){
        try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
            new : true
        });
        res.status(201).json(order);
    }catch(err) {
        res.status(501).json(order);
    }
    }
    if (method==="DELETE") {

    }
}
  