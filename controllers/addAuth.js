import User from "../models/User.js"
import CryptoJS from "crypto-js";
import Jwt from "jsonwebtoken";


export const addRegister = async (req, res)=>{
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }
    catch(error){
        res.status(500).json(error)
        console.log('ca marche pas')
    
}};

export const login = async (req, res)=>{
    
    try{
     
        const user = await User.findOne({ username: req.body.username });

        !user &&  res.status(401).json("Fauses informations d'identification !")

        const  hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);

        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        Originalpassword !== req.body.password &&  res.status(401).json("wrong credentials!")

        const accessToken = Jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: "3d"})

        const {password, ...other} = user._doc;
        res.status(200).json({other, accessToken})
        
    }
    catch(error){
        res.status(500).json(error);
    }

};
