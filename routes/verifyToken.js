import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.token;
    const token = authHeader.split(' ')[1];
    authHeader ? Jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        err && res.status(403).json("token est non validé") 
        req.user = user;
        next();
    }) 
    : res.status(402).json("tu n'es pas authentifié");
}

export const verifyTokenEtAUthorisation = (req, res, next) =>{

    verifyToken(req, res, ()=>{
        req.user.id === req.params.id || req.user.isAdmin ? next()
        : res.status(403).json("Tu n'as pas le droit de faire ca!")
    })

}

export const verifyTokenAdmin = (req, res, next) =>{

    verifyToken(req, res, ()=>{
        req.user.isAdmin ? next()
        : res.status(403).json("Tu n'as pas le droit de faire ca!")
    })

}