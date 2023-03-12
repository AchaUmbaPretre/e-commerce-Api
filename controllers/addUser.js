import User from '../models/User.js';
import Userschema from '../models/User.js'


//Post
export const addUser = async (req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
    }   

    try{
        const updateUser = await Userschema.findOneAndUpdate(req.params.id, 
            { $set: req.body },
            {new: true})
        res.status(200).json(updateUser);
    }
    catch(error){
        res.status(500).json(error);
    }
}

//Delete
export const addDelete = async (req, res) =>{

    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("L'utilisateur a été supprimé")

    }
    catch(error){
        res.status(500).json(error)
    }
}

//Get
export const getRecover = async (req, res) => {

    try{

        const user = await User.findById(req.params.id);
        const { password, ...others} = user._doc;
        res.status(200).json(others)

    }
    catch(error){
        res.status(500).json(error)
    }
}

//Get All
export const getAllRecover = async (req, res) => {

    const query = req.query.new;

    try{

        const users = query ? await User.find().sort({ _id: -1}).limit(1) 
        : await User.find();
        res.status(200).json(users)

    }
    catch(error){
        res.status(500).json(error)
    }
}

//Get user stats
export const getStats = async (req, res) => {

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.setFullYear() - 1));

    try{

        const data = await User.aggregate([
            {$match: { createdAt: { $gte: lastYear } }},
            { 
                $project: { 
                    month: { $month: "$createdAt" },
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ])
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json(error)
    }
}