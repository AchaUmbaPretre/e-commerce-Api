import Cart from "../models/Cart.js";
import Product from "../models/Product.js"


export const addCart = async (req, res) =>{
    const newCart = new Cart(req.body)

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    }
    catch(error){
        res.status(500).json(error)
    }
}

export const cartPut = async (req, res) =>{

    try{
        const newCartUpdate = Cart.findByIdAndUpdate(req.params.id, 
            { $set: req.body }, { new: true })
        res.status(200).json(newCartUpdate)

    }
    catch(error){
        res.status(500).json(error)
    }
}

//Delete
export const cartDelete = async (req, res) =>{

    try{
        Cart.findOneAndDelete(req.params.id)
        res.status(200).json('Le produit a ete supprimé')
    }
    catch(error){
        res.status(500).json(error)
    }
}

//Get cart
export  const cartGet = async (req, res) =>{

    try{
        const cartId = await Cart.findOne({ userId : req.params.userId });
        const { password, ...others} = cartId._doc;
        res.status(200).json(others)
    }
    catch(error){
        res.status(500).json(error)
    }
}

//Get all
export const cartAllGet = async (req, res)=>{

    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    }
    catch(error){
        res.status(500).json(error)
    }
}