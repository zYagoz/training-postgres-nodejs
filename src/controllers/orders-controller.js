import { Order } from "../models/Order"

export const ordersController = {
    //GET /orders
    index: async (req,res) =>{
        const orders = await Order.findAll();
        res.json(orders);
    },

    //POST /orders
    create: async (req,res) =>{
        const newOrder = await Order.create(
            req.body.clientId, // number
            req.body.products // Array{id: number, quantity: number}
        );

        if(!newOrder instanceof Order){
            res.status(400).json(newOrder)
        } else{
            res.staus(200).json(newOrder)
        }
    }
}