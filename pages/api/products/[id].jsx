import dbConnect from "../../../utils/mongo";
import Product from "../../../models/Product";
import mongoose from 'mongoose';

export default async function handler(req, res) {
    const {method,query: {id}, cookies} = req;
    const token = cookies.token;
    dbConnect();
    mongoose.connection.once('open', ()=>{
        console.log('Connection SETUP')
    })
    if (method==="GET") {
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    if (method==="PUT"){
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
    if (method === "DELETE") {
        if (!token || token!==process.env.TOKEN) {
            res.status(401).json("Not Authorized!")
        }
        try {
          await Product.findByIdAndDelete(id);
          res.status(200).json("The product has been deleted!");
        } catch (err) {
          res.status(500).json(err);
        }
      }
    
}
  