const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const User = require("./../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




//@desc register user
//@route Post /users/register
//@access public

exports.register = expressAsyncHandler(async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hash( req.body.password, 10);
    const gender = req.body.gender;
    const phone = req.body.phone;
    const address = req.body.address;
    const user = await User.create({
        name,
        email,
        password,
        gender,
        phone,
        address,
    });

    res.status(201).json({
        status: "success",
        data: {
            user,
        },
    });
});


//@desc login user
//@route Post /users/login
//@access public
exports.login = async ( req, res, next)=>{
    const { email, password } = req.body;
    if ( !email || !password ) {
        return next(new ApiError('Please provide email and password',400))
	}
    const user = await User.findOne({email});
    if ( !user ) {
        return next(new ApiError('invalid email or password',401))
    }
    // const isValidPassword = (password === user.password)? true : false;     ///   test  
    const isValidPassword = await bcrypt.compare(password, user.password); 
    if ( !isValidPassword ) {
        return next(new ApiError('invalid email or password',401))
    }

    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET  /*secret:922023*/ ); 
    const options = {
        httpOnly : true
    };

    // if(process.env.NODE_ENV === 'production'){
    //     options.secure = true;
    // }

    res.status(200).cookie('token',token,options).send({
        success: true, 
        message: "login successfully",
        token
    });
}