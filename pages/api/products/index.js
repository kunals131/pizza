import dbConnect from "../../../utils/mongo";
import Product from "../../../models/Product";
import mongoose from 'mongoose';

export default async function handler(req, res) {
    const {method} = req;
    dbConnect();
    mongoose.connection.once('open', ()=>{
        console.log('Connection SETUP')
    })
    if (method==="GET") {
        res.json("HELLO")
    }
    if (method==="POST"){
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        }catch(err) {
            res.status(500).json(err);
        }
    }
}
  