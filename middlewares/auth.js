const jwt = require('jsonwebtoken')
const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const User = require("./../models/userModel");

exports.protect = expressAsyncHandler(async(req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Barer')){
        token = req.headers.authorization.split(' ')[1];
    }
    // else if(req.cookies.token){
    //     token = req.cookies.token;
    //     console.log(token)
    // }
    
    // make sure token exist
    if(!token){
        return next(new ApiError("Not authorized access",401))
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.userId);
        console.log(req.user)
        next();
    }catch (err){
        return next(new ApiError("Not authorized access",401))

    }
});


// Grant access to specific roles
exports.authorize = (...roles)=>{
    console.log(roles);
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ApiError(`user role ${req.user.role} is not authorized to access this route`,403));
                }
            next();
        }
}