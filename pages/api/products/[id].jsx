import dbConnect from "../../../utils/mongo";
import Product from "../../../models/Product";
import mongoose from 'mongoose';

export default async function handler(req, res) {
    const {method,query: {id}} = req;
    dbConnect();
    mongoose.connection.once('open', ()=>{
        console.log('Connection SETUP')
    })
    if (method==="GET") {
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    if (method==="PUT"){
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        }catch(err) {
            res.status(500).json(err);
        }
    }
    if (method==="DELETE") {

    }
}
  