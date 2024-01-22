const userSchema = require('../models/userModel');
const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const registerUser = catchAsyncError(async(req,res)=>{
    const {name,email,password} = req.body;
    
    const user = await userSchema.create({
        name,
        email,
        password
    });
    sendToken(user,201,res)
});

const loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;

    // checking if user has password and email both
    if(!email || !password){
        return next(new ErrorHandler("please Enter Email or password",401))
    }
    const user = await userSchema.findOne({email:email}).select("+password")  //we user + before password because in the model we set select: false

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched =await user.comparePassword(password); //functionality declared in userModel

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }
    sendToken(user,201,res)
});

// logOut 
const logOut = catchAsyncError(async(req,res)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    res.status(201).json({
        success:true,
        message:"logged out"
    })
})

// Forgot Password

const forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user = await userSchema.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("user not found",404))
    }

    // Get Reset Password Token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});    //save data without checking validation

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `your password reset token is:- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then,
    please ignore it`;

    try {
        await sendEmail({
            email:user.email,
            subject:`Eccommerce password Recovery`,                   //these is options passed as argument in sendMail
            message,
        });
        res.status(201).json({
            success:true,
            message:`Email sent to ${user.email} succefully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave:false});
        return next(new ErrorHandler(error.message,501));
    }
});

const resetPassword = catchAsyncError(async(req,res,next)=>{
    //  creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")                     //this is an algorathm for creating hash
    .update(resetToken)
    .digest("hex");

    const user = await userSchema.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},      //token expire greter then now time
    });
    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired",401))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",401))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);


})

const isLoggedIn = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);
    
        jwt.verify(token,process.env.JWT_SECRETE);
    
        res.send(true);
      } catch (err) {
        res.json(false);
      }
}




module.exports = {
    registerUser,
    loginUser,
    logOut,
    forgotPassword,
    resetPassword,
    isLoggedIn
}