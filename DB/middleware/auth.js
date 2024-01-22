const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userModel');

const isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const { token } = req.cookies;
    // console.log(token);
    if(!token){
        return next(new ErrorHandler("please login to access this resource",401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRETE);
   
    req.user =  await userSchema.findById(decodedData.id);   //here we store user data in req.user
    next();
})

const authorizeRole = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(
                `Role ${req.user.role} is not allowed to access this resource`,403
            ));
        }
        next();
    };
};

module.exports = {isAuthenticatedUser,authorizeRole}