const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
exports.protect = expressAsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // else if(req.cookies.token){
    //     token = req.cookies.token;
    //     console.log(token)
    // }

    console.log(" req.headers: ", req.headers.authorization);
    console.log("token from protect: ", token);
    // make sure token exist
    if (!token) {
        return next(new ApiError("Not authorized access", 401))
    }
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        console.log(userId);
        req.user = await User.findById(userId);
        console.log("this is from protect middleware : ", req.user._id);
        next();
    } catch (err) {
        return next(new ApiError("Not authorized access", 401))
    }

});

// Grant access to specific roles

exports.authorize = (...roles) => {                   /// in case we send more than one role spread them(...role)
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(`${req.user.role} is not authorized to access this route`, 403));
        }
        next();
    }
}

exports.hash = expressAsyncHandler(async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    next();
})

