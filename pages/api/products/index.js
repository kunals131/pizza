import dbConnect from "../../../utils/mongo";
import Product from "../../../models/Product";
import mongoose from 'mongoose';

export default async function handler(req, res) {
    const {method,cookies} = req;
    const token = cookies.token;
    dbConnect();
    mongoose.connection.once('open', ()=>{
        console.log('Connection SETUP')
    })
    if (method==="GET") {
        const allProducts = await Product.find({});
        res.status(200).json(allProducts);
    }
    if (method==="POST"){
        if (!token || token!==process.env.TOKEN) {
            res.status(401).json("Not Authorized!")
        }
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        }catch(err) {
            res.status(500).json(err);
        }
    }
}
  