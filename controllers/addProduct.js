import Product from "../models/Product.js"


export const addProduct = async (req, res) =>{
    const newProduct = new Product(req.body)

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    }
    catch(error){
        res.status(500).json(error)
    }
}

export const productPut = async (req, res) =>{

    try{
        const newProductUpdate = Product.findByIdAndUpdate(req.params.id, 
            { $set: req.body }, { new: true })
        res.status(200).json(newProductUpdate)

    }
    catch(error){
        res.status(500).json(error)
    }
}

//Delete
export const productDelete = async (req, res) =>{

    try{
        Product.findOneAndDelete(req.params.id)
        res.status(200).json('Le produit a ete supprimé')
    }
    catch(error){
        res.status(500).json(error)
    }
}

//Get product
export  const productGet = async (req, res) =>{

    try{
        const productId = await Product.findById(req.params.id);
        const { password, ...others} = productId._doc;
        res.status(200).json(others)
    }
    catch(error){
        res.status(500).json(error)
    }
}

//Get all
export const productAllGet = async (req, res)=>{

    const queryNew = req.query.new;
    const queryCat = req.query.cat;

    try{
        let products;

        if(queryNew){
            products = await Product.find().sort({ createdAt:  -1 }).limit(1)
        }else if(queryCat){
            products = await Product.find({ categories:  {
                $in: [queryCat],
            }, });
        }
        else{
            products = await Product.find(req.body.id)
        }
        res.status(200).json(products)
        
    }
    catch(error){
        res.status(500).json(error)
    }
}