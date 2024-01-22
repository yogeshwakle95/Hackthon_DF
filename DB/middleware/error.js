const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 501;
    err.message = err.message || "Internal server Error";
    
    // if(err.name === 'CastError'){
    //     const message = `Resource not found. Invalid: ${err.path}`;
    //     err = new ErrorHandler(message,400);
    // }

    // mongoose duplicate key error
    // if(err.code ===11000){
    //     const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    //     err = new ErrorHandler(message,501)
    // }
    res.status(err.statuscode).json({
        success:false,
        message:err.message
    });
};
