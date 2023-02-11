const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const User = require("./../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail');
const { protect } = require('./../middlewares/auth')


//@desc register user
//@route Post /users/register
//@access public

exports.register = expressAsyncHandler(async (req, res, next) => {
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = await bcrypt.hash( req.body.password, 10);
    // const gender = req.body.gender;
    // const phone = req.body.phone;
    // const address = req.body.address;
    // const user = await User.create({
    //     name,
    //     email,
    //     password,
    //     gender,
    //     phone,
    //     address,
    // });
    const user = await User.create({
        ...req.body,
    });
    sendTokenResponse(user, 200, res);
    // res.status(201).json({
    //     status: "success",
    //     data: {
    //         user
    //     },
    // });
});


//@desc login user
//@route Post /users/login
//@access public
exports.login = expressAsyncHandler(async ( req, res, next)=>{
    const { email, password } = req.body;
    // if ( !email || !password ) {
    //     return next(new ApiError('Please provide email and password',400))
	// }
    const user = await User.findOne({email});
    if ( !user || !await bcrypt.compare(password, user.password) ) {
        return next(new ApiError('invalid email or password',401))
    }



    // const token = user.getSignedJwtToken();
    // res.status(200).json({success : true,token})
    
    

        sendTokenResponse(user, 200, res);




    // const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET ); 
    // const options = {
    //     httpOnly : true
    // };

    // // if(process.env.NODE_ENV === 'production'){
    // //     options.secure = true;
    // // }

    // res.status(200).cookie('token',token,options).send({
    //     success: true, 
    //     message: "login successfully",
    //     token
    // });
});


//@desc  get current logged in user
//@route get /auth/me
//@access public

exports.getMe =  expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        data: user
    });
});

//@desc  forgot password
//@route Post /auth/forgotPassword
//@access public

exports.forgotPassword =  expressAsyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email : req.body.email });

    if(!user){
        return next(new ApiError('there is no user with that email',404))
    }

    // get reset token 
    const resetToken = user.getResetPasswordToken();
    await user.save();
    console.log("from auth controller resetToken : "+ resetToken);

    // create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
    const message = `You recieve this email to reset password. Please make a put request to: \n\n${resetUrl}`;

    await user.save();

    try{
        await sendEmail({
            email: user.email,
            subject: 'password reset token',
            message
        });
        res.status(200).json({success:true, data:"email sent"})
    }catch(err){
        console.log(err);
        user.passwordResetExpires = undefined;
        user.passwordResetToken = undefined;
        await user.save();
        return next(new ApiError('email could not be sent',500));
    }
    // res.status(200).json({
    //     success : true,
    //     user
    // });
});




//@desc  reset password
//@route put /auth/resetpassword/:resettoken
//@access public

exports.resetPassword =  expressAsyncHandler(async (req, res, next) => {
    
    // get hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

    const user = await User.findOne({
        passwordResetToken,
        passwordResetExpires:{ $gt: Date.now() }
    });
if(!user){
    return next(new ApiError('invalid token',400));
}

user.password = await bcrypt.hash( req.body.password, 10);
user.passwordResetExpires = undefined;
user.passwordResetToken = undefined;
await user.save();

sendTokenResponse(user, 200, res);
});




// get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res)=>{
    // const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET ); 
    const token = user.getSignedJwtToken(); 
    const options = {
        expires : new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly : true
    };

    // if(process.env.NODE_ENV === 'production'){
    //     options.secure = true;
    // }

    res.status(200).cookie('token', token, options).json({
        success: true, 
        user,
        token
    });
}
