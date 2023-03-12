import Order from "../models/Order.js";

export const addOrder = async (req, res) =>{
    const newOrder = new Order(req.body)

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    }
    catch(error){
        res.status(500).json(error)
    }
}

export const orderUpdate = async (req, res)=>{

    try{
        const orderUpdateNew = Order.findByIdAndUpdate(req.params.id, 
            {$set: req.body}, {new: true});
        res.status(200).json(orderUpdateNew)
    }
    catch(error){
        res.status(500).json(error)
    }
}

export const orderDelete = async (req, res) =>{
    
    try{
       Order.findOneAndDelete(req.params.id)
       res.status(200).json('Order est a ete supprimé')
    }
    catch(error){
        res.status(500).json(error)
    }
}

export const getRecoverOrder = async(req, res)=>{

    try{
        const recoverOrderId = await Order.find({ userId : req.params.userId });
        res.status(200).json(recoverOrderId)

    }
    catch(error){
        res.status(500).json(error)
    }
}

export const getAllRecoverOrde = async (req, res)=>{

    try{
        const recoverAllOrder = await Order.find();
        res.status(200).json(recoverAllOrder)

    }
    catch(error){
        res.status(500).json(error)
    }
}

//Get mensuel revenu

export const getIncome = async (req, res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try{
        const income = await Order.aggregate([
            { $match: { createdAt : { $gte : previousMonth }} },
            { $project : { month : { $month : "$createdAt"}, sales : "$amount" } },
            { $group : { _id: "$month", total: { $sum: "$sales" } }},

        ]);
        res.status(200).json(income)
    }
    catch(error){
        res.status(500).json(error)
    }
}